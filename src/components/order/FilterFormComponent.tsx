import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ISearchParams} from "../../interfaces/order/ISearchParams";
import dayjs from "dayjs";

interface IProps {
    onFilterChange: (filters: Partial<ISearchParams>) => void;
}

export const FilterFormComponent: FC<IProps> = ({onFilterChange}) => {
    const {register, handleSubmit, reset} = useForm<Partial<ISearchParams>>();

    const onSubmit: SubmitHandler<Partial<ISearchParams>> = (data) => {
        const formattedData = {
            ...data,
            startDate: data.startDate ? dayjs(data.startDate).format('YYYY-MM-DD') : undefined,
            endDate: data.endDate ? dayjs(data.endDate).format('YYYY-MM-DD') : undefined,
        };
        onFilterChange(formattedData);
    };

    const handleClearFilters = () => {
        reset();
        onFilterChange({});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <input {...register("name")} placeholder="Name" className="form-control m-2"/>
                    <input {...register("surname")} placeholder="Surname" className="form-control m-2"/>
                    <input {...register("email")} placeholder="Email" className="form-control m-2"/>
                    <input {...register("phone")} placeholder="Phone" className="form-control m-2"/>
                    <input {...register("status")} placeholder="Status" className="form-control m-2"/>
                </div>
                <div className="d-flex flex-row">
                    <input {...register("course")} placeholder="Course" className="form-control m-2"/>
                    <input {...register("courseFormat")} placeholder="Course Format" className="form-control m-2"/>
                    <input {...register("courseType")} placeholder="Course Type" className="form-control m-2"/>
                    <input {...register("groupName")} placeholder="Group Name" className="form-control m-2"/>
                    <input {...register("startDate")} type="date" className="form-control m-2"/>
                    <input {...register("endDate")} type="date" className="form-control m-2"/>
                    <button type="submit" className="btn btn-success m-2">Search</button>
                    <button type="button" className="btn border-success m-2" onClick={handleClearFilters}>Clear filters</button>
                </div>
            </div>
        </form>
    );
};

export default FilterFormComponent;