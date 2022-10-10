import { useCallback, useEffect, useRef, useState } from "react"
import FilterToggle from "./filter"
import { IoFilterOutline } from 'react-icons/io5';

import IconMiddleware from "../../core-ui/icons"
import { courses as course } from "../../constants/branchName"
import "./searchBar.css"
import { createSearchParams, Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

let filterCall = (...func) => (...args) => func.forEach(fun => fun && fun(...args))
function useFilter() {
  const [filterBtn, setfilterBtn] = useState(false);
  const filterbtnToggle = () => setfilterBtn(!filterBtn);

  let refFilterSelectOption = useRef(null)
  function filterToggleprops({ onClick, ...props } = {}) {
    return {
      onClick: filterCall(filterbtnToggle, onClick),
      ...props
    }
  }
  return {
    filterBtn,
    filterToggleprops,
    refFilterSelectOption
  }
}


function useSearchInput() {
  const ref = useRef(null)
  const [suggestionsOut, setSuggestionOut] = useState([]);
  let [isVisible, setVisible] = useState(false);
  let [input, setInput] = useState({});
  const showSuggestion = () => setVisible(true);
  const hideSuggestion = () => setVisible(false);
  const searchTrigger = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  }
  const urlParams = new URLSearchParams(input);

  const initRender = useRef(false);
  useEffect(() => {
    if (initRender.current == false) {
      initRender.current = true
      return
    }
    let controller = new AbortController();
    (async () => {
      console.log("coooolna")
      await fetch(`${process.env.REACT_APP_API}/s?${urlParams.toString()}`, {
        signal: controller.signal
      }).then(async (e) => {
        let res = await e.json()
        setSuggestionOut(res.data)
      }
      )
      showSuggestion()
    })()
    return () => {
      controller.abort();
    }
  }, [input])
  useEffect(() => {
    window.addEventListener("mouseup", clickOutside);

    return () => {
      window.removeEventListener("mouseup", clickOutside);
    };
  }, []);

  const clickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      hideSuggestion();
    }
  };

  const navigate = useNavigate();
  let searchListClick = (e) => {
    navigate(e._id.toString());
  }
  let submitSearchTrigger = (refFilterSelectOption = null) => {

    if (ref.current && refFilterSelectOption != null) {
      const name = 'branch';
      const value = refFilterSelectOption.current;
      // console.log(new URLSearchParams({ name: value }).toString())
      urlParams.append(name, value)
      navigate({
        pathname: "search",
        search: urlParams.toString()
      })
      console.log(urlParams.toString());
    }
    console.log(input)
    navigate({
      pathname: "search",
      search: urlParams.toString()
    })
  }



  return {
    ref,
    input,
    searchTrigger,
    isVisible,
    suggestionsOut
    , searchListClick,
    submitSearchTrigger
  }
}



const SearchBar = () => {
  const { ref, input, searchTrigger,
    isVisible, suggestionsOut
    , searchListClick,
    submitSearchTrigger
  } = useSearchInput()
  const { filterBtn, filterToggleprops, refFilterSelectOption } = useFilter()

  return (
    <div className="wrapper" >
      <div className="innerBox">
        <div className="innerWrapper">
          <form onSubmit={() => submitSearchTrigger(refFilterSelectOption)}>
            <span className="searchBar" ref={ref} >
              <input className="searchInput" type="text"
                placeholder="search notes ..."
                name="title"
                value={input.title || ""} onChange={searchTrigger} list="browsers" />
              {/* <IoFilterOutline className="filtersvg" onClick={() => setfilterBtn(!filterBtn)} /> */}
              <span {...filterToggleprops({ onClick: () => console.log("Filter Btn Click") })} >
                <IconMiddleware Icon={"filterIcon"} classStyle={('filtersvg')} />
              </span>


            </span>
          </form>
          <div className={`suggestionBox ${isVisible ? "visible" : "invisible"} `}>
            <div className="test">
              <div className="minitest">
                <div className="searchBar searchResult" >

                  {suggestionsOut.map((e) => {
                    // let titleWithoutSpace = e.title.replace(/\s+/g, '-');
                    return (
                      <div onClick={() => searchListClick(e)} key={e._id}>
                        < div className="textWrap" >
                          {e.title}
                        </div>
                        <span>{e.createdAt}</span>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
          {filterBtn && <FilterToggle course={course} refs={refFilterSelectOption} />
          }
        </div>


      </div>


    </div >

  )
}

export default SearchBar
