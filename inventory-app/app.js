const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { saveCategory, saveProduct, getProducts, getCategories, getCategoryId, filter, getProductById, getCategoryNameById, updateProduct, deleteProduct, deleteCategory, filterProducts, filterCategories, getCategoriesWithOffset } = require("./db/queries");
const multer = require('multer');
const { title } = require("process");
const { validateFile } = require("./helper/customValidation");
const session = require('express-session');
const flash = require('connect-flash');
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');


const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage});

// Setup session middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

// Setup flash middleware
app.use(flash());

// Middleware to pass flash messages to templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});


const filters = [];
let productSearch = "";
app.get("/", async (req, res) => {


    const pageNum = req.query.pageNum ? Number.parseFloat(req.query.pageNum) : 1;
    let offset = (pageNum - 1) * 15;
    
    if (req.query.search_data !== undefined) {
        productSearch = req.query.search_data;
    }
    const sortBy = req.flash("sortBy")[0];
    const sort = req.flash("sort")[0];
    const flashCategories = req.flash("categories");
    
    if (sortBy && sort) {
        filters["sortBy"] = sortBy;
        filters["sort"] = sort;
        filters["categories"] = flashCategories;
    }

    const categories = await getCategories();
    const products = Object.keys(filters).length > 0 ? await filter(filters, offset, productSearch) : await getProducts(offset, productSearch);

    if (products.length === 0 && pageNum > 1) {
        return res.redirect("/?pageNum=" + (pageNum - 1));
    }

    res.render("index", {res: {prevSearch: productSearch, pageNum: pageNum, filters: filters, categories: categories, products: products}});
});

app.post("/applyFilter", async (req, res) => {
    const data = req.body;

    req.flash("sortBy", data.sort_by);
    req.flash("sort", data.sort);
    req.flash("categories", data.categories);
    
    res.redirect("/");
});


app.get("/findCategory", async (req, res) => {

    const categories = await filterCategories(req.query.search_data);

    res.render("categoryPage", {res: {prevSearch: req.query.search_data, categories: categories}});
});


app.get("/categoryPage", async (req, res) => {
    const categories = await getCategories();
    res.render("categoryPage", {res: {categories: categories}});
});


app.get("/productAddPage", async (req, res) => {
    
    const id = req.query.productId;
    const categories = await getCategories();
    let productData = {};

    if (id) {
        productData = await getProductById(id);

        const categoryName = await getCategoryNameById(productData[0].category_id);

        const [key, value] = Object.entries(categoryName[0])[0];
       
        productData[0][key] = value;
        if (productData[0].image !== null) {
            const base64Image = productData[0].image.toString("base64");
            const newImage = `data:image/png;base64, ${base64Image}`;
            productData[0].image = newImage;
        }
        
    } else {
        productData = [{
            product_id: "",
            name: "",
            description: "",
            quantity: 1,
            image: "#",
            price: 0.01,
            category_name: ""
        }];
    }
    
    res.render("productAddPage", {errors: [], categories: categories, product: productData});
});



app.post("/saveCategory", async (req, res) => {
    const categoryData = req.body;

    await saveCategory(categoryData.category_name);
    const categories = await getCategories();
    
    res.render("categoryPage", {res: {categories: categories}});
});

const productValidator = [

    body("product_name")
        .trim()
        .notEmpty().withMessage("Name can't be empty")
        .isLength({ max: 30 }).withMessage("Name can't exceed 30 characters"),
    body("product_quantity")
        .trim()
        .notEmpty().withMessage("Quantity can't be empty")
        .isFloat({min: 1, max: 99}).withMessage("Quantity must be between 1 and 99"),
    body("product_price")
        .trim()
        .notEmpty().withMessage("Price can't be empty")
        .isFloat().withMessage("Price must be integer")
        .isFloat({min: 0.01}).withMessage("Price must be more that 0.1"),
    body("category_name")
        .trim()
        .notEmpty().withMessage("Category cannot be empty")
    

];

app.post('/saveProduct', upload.single('product_image'), productValidator, async (req, res) => {
    const productData = req.body;
    
    
    const productName = productData.product_name;
    const categoryName = productData.category_name;
    const desc = productData.product_desc;
    const image = req.file;
    const quant = productData.product_quantity;
    const price = productData.product_price;
    
    const category = await getCategoryId(categoryName);
    
    const product = {
        product_id: productData.product_id,
        name: productName,
        description: desc,
        quantity: quant,
        image: image ? image.buffer : null,
        price: price,
    };
    const errors = validationResult(req);
    
    const imageValidation = validateFile(image);
    
    const errorsToSend = errors.array();
    if (imageValidation !== true) {
        
        product.image = null;
        errorsToSend.push(imageValidation);
    }

    if (!errors.isEmpty()) {
        if (product.product_id !== "") {
            const orgProduct = await getProductById(product.product_id);
           
            const base64Image = orgProduct[0].image.toString("base64");
            const newImage = `data:image/png;base64, ${base64Image}`;
            product.image = newImage;    
        }


        const categories = await getCategories();
        return res.status(400).render("productAddPage", {
           title: "Add product",
           errors: errorsToSend,
           product: [product],
           categories: categories
        });
    }
    
    if (productData.product_id === '') {
        await saveProduct(category[0].category_id, product);
    } else {
        await updateProduct(category[0].category_id, product);
    }


    res.redirect('/');
});

app.get("/deleteProduct", async (req, res) => {
    
    await deleteProduct(req.query.productId);
    res.redirect("/");
});

app.get("/deleteCategory", async (req, res) => {

    await deleteCategory(req.query.categoryId);
    res.redirect("/categoryPage");
});


app.listen(3001, () => {
    console.log("App running on http://127.0.0.1:3001");
});