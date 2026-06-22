import "@style/vars.scss";
import { type LinkPayload, LinkType } from "@components/Links/Link";
import CardGenerator, { CardGenType } from "@/components/CardGenerator/CardGenerator";
import Footer from "@/components/Footer/Footer";
import { TitleType } from "./components/Title/Title";

function App() {
  const debug = true;
  const pathString = debug ? "LostAndFound/" : "";
 
  const footerData: LinkPayload[] = [];
  footerData.push({
    href: "https://www.linkedin.com/in/kaijauregi/",
    target: "_blank",
    textClassname: "fa-brands fa-linkedin",
  });
  footerData.push({
    href: "https://github.com/jauregiazcue",
    target: "_blank",
    textClassname: "fa-brands fa-square-github",
  });

  return (
    <>
      <CardGenerator title="Objetos Perdidos" id="objetosPerdidos" csv={`${pathString}ListadoResultados.xlsx`} type={CardGenType.grid}  titleType={TitleType.preHero}/>
      <Footer id="contact"
        links={{ list: footerData, type: LinkType.simple }}
        owner={"Kai Jauregi Azcue"}
        email={"kai.jauregi@proton.me"} />
    </>
  )
}


export default App;

