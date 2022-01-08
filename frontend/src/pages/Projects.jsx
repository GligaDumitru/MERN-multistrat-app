import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/DefaultFooter";
import Header from "../components/profile/Header";
import LayoutPage from "../components/people/LayoutPage";
import Breadcrumb from "../components/shared/Breadcrumb";
import ProjectsOverview from "../components/projects/ProjectsOverview";

export default function Projects() {
  const routesBreadcrumb = [
    {
      name: "",
      icon: "home",
      urlTo: "/",
    },
    {
      name: "Projects",
      icon: "dashboard",
      urlTo: "/projects",
    },
  ];
  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <Header />
      <LayoutPage>
        <div className="p-8">
          <Breadcrumb routes={routesBreadcrumb} />
          <ProjectsOverview />
        </div>
      </LayoutPage>
      <DefaultFooter />
    </>
  );
}
