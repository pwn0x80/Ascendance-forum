import Searchbar from "../../components/searchBar/SearchBar"
import "./home.css"
import Logo from "../../components/logo/logo";
import Chat from "../../components/gobalChat/GlobalChat"
import Tooltip from "../../core-ui/components/Tooltip";
const Home = () => {


  return (
    <div className="home" >
      <Logo />
      <Searchbar />

      <Chat />
      <Tooltip text="coolna">
        <button type="">hi</button>
      </Tooltip>

    </div>
  )
}

export default Home
