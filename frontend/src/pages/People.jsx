import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/DefaultFooter";
import Header from "../components/profile/Header";
import ViewPeople from "../components/people/ViewPeople";

export default function People() {
  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <ViewPeople />
      </main>
      <DefaultFooter />
    </>
  );
}
