import IntroSection from "./IntroSection";
import PopupSection from "./PopupSection";
import ExpSection from "./ExpSection";
import EduSection from "./EduSection";
import RefSection from "./RefSection";
import { popupOptions } from "./select";

// popupOptions(document.getElementById("root"));

export default function Layout() {

    return (
        <>
            <PopupSection parentElement={document.getElementById("root")} />
            <div id="intro">
                <IntroSection />
            </div>
            <div id="experience">
                <ExpSection />
            </div>
            <div id="education">
                <EduSection />
            </div>
            <div id="references">
                <RefSection />
            </div>
            <div id="misc">
                <MiscSection />
            </div>
        </>
    );
}





function MiscSection() {
    return (
        <>
            <div className="image"><img style={{borderRadius: "50%", width: "100px",height: "100px"}} src="https://byuc.wordpress.com/wp-content/uploads/2012/07/avat-2.jpg" alt="" /></div>    
            <div className="tech-stack"></div>    
            <div className="languages"></div>    
            <div className="certificates"></div>    
        </>
    );
}