import React from "react";
import { CreateNewMandatory } from "../report/create-new-mandatory";
import { NavigationHeader } from "./utils/navigation-header";

export function CreateNew() {
    return (
        <div className="create-new">
            <NavigationHeader header="Create New" />
            <CreateNewMandatory />
        </div>
    )
}