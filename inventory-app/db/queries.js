const pool = require("./pool");

const saveCategory = async (categoryName) => {

    await pool.query("insert into category (category_name) values ($1) on conflict (category_name) DO NOTHING", [categoryName]);
};

const saveProduct = async(categoryId, product) => {

    const productName = product.name;
    const desc = product.description;
    const quant = product.quantity;
    const img = product.image;
    const price = product.price;

    await pool.query("insert into product (name, category_id, description, quantity, image, price) values ($1, $2, $3, $4, $5, $6) on conflict (name) DO NOTHING", 
        [productName, categoryId, desc, quant, img, price]);
 
};

const updateProduct = async(categoryId, product) => {

    const productName = product.name;
    const desc = product.description;
    const quant = product.quantity;
    const img = product.image;
    const price = product.price;

    let query = "";

    if (img) {
        query = "update product set name=($1), category_id=($2), description=($3), quantity=($4), image=($5), price=($6) where product_id=($7)"
        await pool.query(query, 
            [productName, categoryId, desc, quant, img, price, product.product_id]);
    } else {
        query = "update product set name=($1), category_id=($2), description=($3), quantity=($4), price=($5) where product_id=($6)"
        await pool.query(query, 
            [productName, categoryId, desc, quant, price, product.product_id]);
    }

 
};

const deleteProduct = async (id) => {

    await pool.query("delete from product where product_id=($1)", [id]);

};
const deleteProductByCategory = async (id) => {
    await pool.query("delete from product where category_id=($1)", [id]);

};

const getCategoryId = async (name) => {
    const {rows} = await pool.query("select category_id from category where category_name=($1) limit 1", [name]);

    return rows;
};

const getProductById = async (id) => {

    const { rows } = await pool.query("select * from product where product_id=($1)", [id]);

    return rows;

};

const getCategoryNameById = async (id) => {

    const { rows } = await pool.query("select category_name from category where category_id=($1)", [id]);

    return rows;
};


const deleteCategory = async (id) => {

    await deleteProductByCategory(id);
    await pool.query("delete from category where category_id=($1)", [id]);
};

const getCategoriesWithOffset = async (offset) => {
    const { rows } = await pool.query("select * from category limit 15 offset ($1);", [offset]);
    
    return rows;
};

const getCategories = async () => {
    const { rows } = await pool.query("select * from category");
    
    return rows;
};

const getProducts = async (offset, keyword) => {
    const { rows } = await pool.query("select * from product where name like ($1) limit 15 offset ($2);", [`%${keyword}%`, offset]);
    
    rows.forEach((row) => {
        if (row.image) {
            const base64Image = row.image.toString("base64");
            const newImage = `data:image/png;base64, ${base64Image}`;
            row.image = newImage;
        }
    });


    return rows;
};

const getProductsByCategory = async (id) => {

    const { rows } = await pool.query("select * from product where category_id=($1)", [id]);

    return rows;

};

const allowedSortBy = ["name", "price"];
const allowedSort = ["asc", "desc"];

const filter = async (filters, offset, keyword) => {
    const sortBy = filters["sortBy"];
    const sort = filters["sort"];
    const categories = filters["categories"];

    if (!allowedSortBy.includes(sortBy)) {
        throw new Error("Unkown order clause");
    }

    if (!allowedSort.includes(sort)) {
        throw new Error("Uknown sort clause");
    }

    let values = [];

    let query = "select * from product where name like ($1) ";

    if (categories.length > 0) {
        values = [`%${keyword}%`, ...categories];
        query += "and ";
        query += `category_id=($2)`;
        for (let i = 1; i < categories.length; i++) {
            query += ` or category_id=($${i + 2})`;
        }
        query += ` order by ${sortBy} ${sort}`;
    } else {
        values = [`%${keyword}%`];
        query += ` order by ${sortBy} ${sort}`;
        
    }
    
    query += ` limit 15 offset ${offset}`;

    const { rows } = await pool.query(query, values);


    rows.forEach((row) => {
        if (row.image) {
            const base64Image = row.image.toString("base64");
            const newImage = `data:image/png;base64, ${base64Image}`;
            row.image = newImage;
        }
    });

    return rows;

};

const filterProducts = async (keyword, offset) => {

    const { rows } = await pool.query("select * from product where name like ($1) limit 15 offset ($2)", [`%${keyword}%`, offset]);

    return rows;
};

const filterCategories = async (keyword) => {

    const { rows } = await pool.query("select * from category where category_name like ($1)", [`%${keyword}%`]);

    return rows;
};


module.exports = {
    saveCategory,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getCategories,
    getCategoriesWithOffset,
    getProductsByCategory,
    getCategoryId,
    filter,
    getProductById,
    getCategoryNameById,
    deleteCategory,
    filterProducts,
    filterCategories
};