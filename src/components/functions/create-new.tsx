import React from "react";
import { MandatoryReport } from "../report/mandatory-report";
import { NavigationHeader } from "./utils/navigation-header";

export function CreateNew() {
    return (
        <div className="create-new">
            <NavigationHeader header="Create New" />
            <MandatoryReport />
        </div>
    )
}