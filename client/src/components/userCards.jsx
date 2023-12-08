import { React, useContext, useEffect } from 'react'
import { LoginContext } from './context'
import Card from './Card';
import ReactPaginate from 'react-paginate';



const UserCards = () => {
  const { users, pageCount,currentPage, setfilter } = useContext(LoginContext);


  useEffect(() => {
    currentPage.current=1;
    // getAllUser();
    // getPaginatedUsers();
    setfilter()
  }, []);

  function handlePageClick(e) {
   currentPage.current=e.selected+1;
    // getPaginatedUsers();
    setfilter()
   

  }

  return (
    <div className=''>
      <div className='md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-4 mx-3'>
        {
          users.map((item, index) => (
            <Card data = {{id:item.id, first_name: item.first_name, last_name: item.last_name, avatar: item.avatar, email: item.email, domain: item.domain, gender: item.gender, available: item.available}}/>
              
          ))
        }
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active rounded-full border-2 px-4 bg-slate-700"
          forcePage={currentPage.current-1}
          className='flex justify-between m-4 mb-16'
        />
    </div>
  )
}

export default UserCards