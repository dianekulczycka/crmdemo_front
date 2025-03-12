import {FC} from "react";

interface IProps {
    onSort: (column: string) => void;
    currentOrder: string;
    currentDirection: string;
}

const TableHeaderComponent: FC<IProps> = ({onSort, currentOrder, currentDirection}) => {
    return (
        <thead>
        <tr>
            <th onClick={() => onSort("id")}>ID {currentOrder === "id" && (currentDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => onSort("name")}>Name {currentOrder === "name" && (currentDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => onSort("surname")}>Surname</th>
            <th onClick={() => onSort("email")}>Email</th>
            <th onClick={() => onSort("phone")}>Phone</th>
            <th onClick={() => onSort("age")}>Age</th>
            <th onClick={() => onSort("course")}>Course</th>
            <th onClick={() => onSort("courseFormat")}>Course Format</th>
            <th onClick={() => onSort("courseType")}>Course Type</th>
            <th onClick={() => onSort("sum")}>Sum</th>
            <th onClick={() => onSort("alreadyPaid")}>Already Paid</th>
            <th onClick={() => onSort("createdAt")}>Created At</th>
        </tr>
        </thead>
    );
};

export default TableHeaderComponent;