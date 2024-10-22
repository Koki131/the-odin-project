import IntroSection from "./IntroSection";
import PopupSection from "./PopupSection";
import ExpSection from "./ExpSection";
import EduSection from "./EduSection";
import RefSection from "./RefSection";
import MiscSection from "./MiscSection";


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

