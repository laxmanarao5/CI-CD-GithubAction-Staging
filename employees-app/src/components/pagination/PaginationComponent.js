import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate';

//import CSS
import "./PaginationComponent.css"


//React component
const PaginationComponent = ({items,setCurrentItems,itemsPerPage,currentPage,setCurrentPage}) => {

    // console.log(items);
  const pageCount =items.length===0 ?1:Math.ceil(items.length / itemsPerPage);

  // setCurrentItems(currentItems.slice(lowerLimit,UpperLimit))
  //creating items per page
  let createNewItems = (start,end) =>{
    let newItems = items.slice(start,end)
    let difference = newItems.length-itemsPerPage
    if(difference !==0){
      for (let index = 0; index < difference; index++) {
        newItems.push({})
      }
    } 
    setCurrentItems(newItems)
  }

  //Function to handle page click
  let handlePageClick = (event)=>{
    //setting current page
    setCurrentPage(event.selected)
    // console.log(currentPage);
    createNewItems(event.selected*itemsPerPage,event.selected*itemsPerPage+itemsPerPage) 
  }

  useEffect(()=>{

    //To maintain current page
    if(currentPage===0){
      setCurrentItems(items.slice(0,itemsPerPage))
    }
    else{
      createNewItems(currentPage*itemsPerPage,currentPage*itemsPerPage+itemsPerPage)
    }
    
  },[items])

  return (
    <div>
      <div className='d-flex'><a className='pageLink d-flex'></a></div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName={"eachPage"}
        pageLinkClassName={"pageLink"}
        className={"paginationContent"}
        activeClassName={"activePage"}
        activeLinkClassName={"activeLinkPage"}
        previousClassName={"eachPage"}
        previousLinkClassName={"pageLink"}
        nextClassName={"eachPage"}
        nextLinkClassName={"pageLink"}
        disabledClassName={"disabledPage"}
        disabledLinkClassName="disabledPageLink"

      />
    </div>
  )
}

export default PaginationComponent