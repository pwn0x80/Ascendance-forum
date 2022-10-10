import { Children, useEffect, useState } from 'react';
import React from 'react';
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import "./noteList.css"
import { AiOutlineLike, AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md"
import { AiOutlineDislike } from "react-icons/ai";
import Pagination from "../../components/pagination/pagination"

function useDatafetch() {
  const [noteFetch, setnotefetch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  let setLoad = () => setIsLoading(false)
  return {
    setLoad,
    isLoading,
    currentPage,
    noteFetch,
    setnotefetch,
    setCurrentPage
  }
}

const NoteDetail = () => {
  const { setLoad, isLoading, currentPage, noteFetch, setnotefetch, setCurrentPage } = useDatafetch()
  const queryParams = useLocation()
  let navigate = useNavigate()
  // const params = useParams()
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log("&&&", searchParams);
  // console.log("saaaaaa", queryParams.search)
  // const searchTitle = new URLSearchParams(queryParams.search).get('title');

  useEffect(() => {
    let pageParams = new URLSearchParams({ "page": currentPage }).toString();
    let controller = new AbortController();
    (async () => {
      await fetch(`${process.env.REACT_APP_API}/s/noteList${queryParams.search}&${pageParams}`, {
        signal: controller.signal
      }).then(async (e) => {
        let noteFetch = await e.json()
        setnotefetch(noteFetch);
        setLoad();
      })
    })();
    return () => {
      controller.abort()
    }
  }, [currentPage]);


  if (isLoading == true) {
    return (
      < div >loading</div >
    )
  }
  let TableTitleName = ({ children }) => {
    return React.cloneElement(children, { onClick: () => navigate("/t/" + children.props.children) })
  }
  let TableCollegeName = ({ children }) => {
    return React.cloneElement(children, { onClick: () => navigate("/c/" + children.props.children) })
  }


  function TableList({ children }) {
    return React.Children.map(children, child => {
      const newChild = React.cloneElement(child)
      return newChild;
    })
  }




  return (
    <div className='listWrapper'>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>college</th>
            <th className='flag'><AiTwotoneLike style={{ color: "green" }} /></th>
            <th className='flag'>< AiTwotoneDislike style={{ color: "red" }} /> </th>
            <th className='flag'  ><MdOutlineReportProblem style={{ color: "red" }} /> </th>
          </tr>
        </thead>
        {console.log(noteFetch.data)}
        {
          noteFetch.data.map((e) => {
            console.log(e.title)
            return (
              < tbody >
                <tr>
                  <TableList>
                    <TableTitleName>
                      <td datalabel="title" className='title'>{e.title}</td>
                    </TableTitleName>
                    <TableCollegeName>
                      <td datalabel="college" className='college'>{e.college}</td>
                    </TableCollegeName>
                    <td datalabel="like" style={{ color: "green" }} className='flag'>{e.like}</td>

                    <td datalabel="unlike" style={{ color: "red" }} className='flag' >0</td>
                    <td style={{ color: "red" }} className='flag' >{e.report}</td>

                  </TableList>
                </tr>
              </tbody>
            )
          })
        }
      </table>
      <Pagination
        paginationcss="paginationcss"
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        totalCount={noteFetch.metadata[0].total}
        pageSize={2}
      />

    </div >
  )
}

export default NoteDetail;
