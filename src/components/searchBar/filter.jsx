import React, { Fragment, useMemo, useRef } from "react";
import "./filter.css"
import { courses as course } from "../../constants/branchName"
const Filter = (props) => {
  const coursesList = useMemo(() => course, [])
  const { refs } = props;
  let trigger = (e) => {
    refs.current = e.target.value
  }
  return (
    <div className="selectFilter">
      <select className="select" defaultValue={'DEFAULT'} name="branch" onChange={(e) => trigger(e)}>
        <option value="DEFAULT" disabled>Choose a Branch ...</option>
        {coursesList.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div >
  )
}

export default React.memo(Filter)




