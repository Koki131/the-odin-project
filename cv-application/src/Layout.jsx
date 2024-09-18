import IntroSection from "./IntroSection";

export default function Layout() {

    return (
        <>
            <div id="intro">
                <IntroSection />
            </div>
            <div id="experience">
                <ExpSection />
            </div>
            <div id="education">
                <EduSection />
            </div>
            <div id="misc">
                <MiscSection />
            </div>
        </>
    );
}


function ExpSection() {
    return (
        <>
            <div className="work-exp">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam dolor sint laudantium odit temporibus nemo obcaecati? Eum, laudantium dolor accusamus, ad explicabo nisi magnam quam officiis ratione eligendi eaque maiores veritatis soluta. Velit impedit enim culpa harum repudiandae at maiores, expedita aliquam pariatur doloremque distinctio corrupti eos repellat ipsum consequuntur ipsa earum veritatis praesentium aperiam! Amet nobis, aliquam corrupti repellendus maiores ducimus vitae quo sunt omnis eius quas saepe distinctio dolorum unde quidem placeat beatae facere. Temporibus, voluptas natus itaque provident nulla tempore maiores fuga deleniti debitis? Reiciendis in molestias illo veritatis doloremque, praesentium cum minima sunt, voluptate optio voluptas!</div>    
            <div className="project-exp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente officiis recusandae ad veritatis animi dicta deserunt cupiditate corporis sed quo voluptatem assumenda, id, beatae, rerum perspiciatis quisquam temporibus doloremque similique quae corrupti facilis eligendi repellat? Quae id ab odit hic ducimus iusto corrupti facilis ullam magni nihil! Maxime, eaque neque.</div>     
        </>
    );
}

function EduSection() {
    return (
        <>
            <div className="education"></div>    
            <div className="references"></div>      
        </>
    );
}


function MiscSection() {
    return (
        <>
            <div className="image">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex ad dignissimos libero molestias error amet quam velit laborum accusantium placeat cupiditate officia consectetur, expedita eos est aliquam atque sunt. Dolor!</div>    
            <div className="tech-stack"></div>    
            <div className="languages"></div>    
            <div className="certificates"></div>    
        </>
    );
}