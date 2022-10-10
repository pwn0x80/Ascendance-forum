import React, { useMemo } from "react";
import courses from "../../constants/branchName"

const filterList = ({ searchTrigger }) => {
  const coursesList = useMemo(() => courses, []);
  return (
    <>

      <select className="select" defaultValue={'DEFAULT'} name="branch" onChange={searchTrigger}>
        <option value="DEFAULT" disabled>Choose a Branch ...</option>

        {coursesList.map((e) => (
          <option key={e} value={e}>
            {e}
            {console.log("saaaaaaaaaaaaaaaa")}
          </option>
        )
        )}

      </select>

    </>
  )
}

export default filterList
