import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/DefaultFooter";
import Header from "../components/profile/Header";
import Content from "../components/profile/Content";
import { useSelector } from "react-redux";
import { selectState } from "../features/auth/authSlice";

export default function Profile() {
  const { user } = useSelector(selectState);
  if (!user) {
    <section className="relative py-16 bg-gray-100">
      Something went wrong!
    </section>;
  }

  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <Content />
      </main>
      <DefaultFooter />
    </>
  );
}
