import {FC} from 'react';
import ReactPaginate from 'react-paginate';
import {useAppDispatch} from "../store/helpers/useAppDispatch";
import {orderActions} from "../store/slices/orderSlice";

interface IProps {
    total: number;
    page: number;
    itemsPerPage: number;
}

const PaginationComponent: FC<IProps> = ({total, page, itemsPerPage}) => {
    const dispatch = useAppDispatch();

    const handlePageChange = (selectedPage: { selected: number }) => {
        dispatch(orderActions.setPage(selectedPage.selected + 1));
    };

    return (
        <div className="p-lg-1">
            <ReactPaginate
                pageCount={Math.ceil(total / itemsPerPage)}
                pageRangeDisplayed={7}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item m-1"
                pageLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                previousClassName="page-item m-1"
                previousLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                nextClassName="page-item m-1"
                nextLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                breakClassName="page-item m-1"
                breakLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                previousLabel="<"
                nextLabel=">"
            />
        </div>
    );
};

export default PaginationComponent;