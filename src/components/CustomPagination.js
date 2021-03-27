import Pagination from '@material-ui/lab/Pagination';

const CustomPagination = ({ setPage, numOfPages = 10}) => {

    const handlePageChange =(page) => {
        setPage(page)
        window.scroll(0, 0)
    }

    return (
        <div className="custom-pagination">
            <Pagination 
                onChange={e => handlePageChange(e.target.textContent)} 
                count={numOfPages} 
                color="secondary" 
                hideNextButton
                hidePrevButton
            />
        </div>
    )
}

export default CustomPagination
