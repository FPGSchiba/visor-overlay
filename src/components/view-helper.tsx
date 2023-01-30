import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateNewHelper } from "./report/create-new-helper";

export function ViewHelper() {
    const location = useLocation();
    const [createNew, setCreateNew] = useState(false);

    useEffect(() => {
        if (location.pathname.match("\/create-new")) {
            setCreateNew(true);
        } else { // TODO: Add more possibilities
            setCreateNew(false);
        }
    }, [location])

    return (
        <>
            { createNew ? (
                <CreateNewHelper />
            ) : null}
        </>
    )
}