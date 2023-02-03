export interface IVISORScreenshot {
    description: string;
    picture: string;
}

export interface IVISORVirsConsolesFuel {
    hydrogen: boolean;
    quantanium: boolean;
}

export interface IVISORVirsConsolesWeapons {
    personal: boolean;
    ship: boolean;
}

export interface IVISORVirsConsoles {
    trading: boolean;
    mining: boolean;
    finePayment: boolean;
    security: boolean;
    weaponSales: IVISORVirsConsolesWeapons;
    shipComponents: boolean;
    shipRental: boolean;
    landing: boolean;
    habitation: boolean;
    fuel: IVISORVirsConsolesFuel;
    repair: boolean;
    rearm: boolean;
}

export interface IVISORVirsPads {
    ground: number;
    ship: number;
}

export interface IVISORVirs {
    temperatureMeasures?: number[];
    breathable: boolean;
    externalPressure?: number;
    composition: string;
    pads?: IVISORVirsPads;
    surfaceElevation?: number;
    radiation?: number;
    gravity?: number;
    consoles: IVISORVirsConsoles;
}

export interface IVISORFuelConsumptionPoint {
    name: string;
    distance: number;
}

export interface IVISORFuelConsumption {
    ship: string;
    drive: string;
    fuelConsumption: string;
    pointA: IVISORFuelConsumptionPoint;
    pointB: IVISORFuelConsumptionPoint;
}

export interface IVISORNavigationStation {
    name: string;
    distance: number;
}

export interface IVISORNavigationGround {
    name: string;
    distance: number;
    bearing?: number;
}

export enum OMName {
    OM1 = "om1",
    OM2 = "om2",
    OM3 = "om3",
    OM4 = "om4",
    OM5 = "om5",
    OM6 = "om6"
}

export interface IVISORNavigationStraightOM {
    om: OMName;
    distance: number;
}

export interface IVISORNavigation {
    om1: number;
    om2: number;
    om3: number;
    om4: number;
    om5: number;
    om6: number;
    straightLineOms?: IVISORNavigationStraightOM[];
    refuelingGroundPoi?: IVISORNavigationGround;
    spaceStation?: IVISORNavigationStation;
}

export interface IVISORLocationDetailsZones {
    noFly: boolean;
    armistice: boolean;
    restricted: boolean;
    other?: string;
}

export interface IVISORLocationDetails {
    classification: string;
    surroundings: string;
    trade?: string;
    services?: string;
    hostiles?: string;
    defenses?: string;
    occupants?: string;
    lethalForce?: string;
    remainingOccupants?: string;
    zones: IVISORLocationDetailsZones;
}

export interface IVISORReportMeta {
    rsiHandle: string;
    visorCode: number;
    visorCodeJustification?: string;
    scVersion: string;
    date: number;
    followupTrailblazers: boolean;
    followupDiscovery: boolean;
    followupJustification?: string;
}

export interface IVISORLocation {
    system: string;
    stellarObject: string;
    planetLevelObject?: string;
    poiType: string;
    jurisdiction: string;
}

export interface IVISORReport {
    id: string;
    reportName: string;
    approved: boolean;
    published: boolean;
    visorLocation: IVISORLocation;
    reportMeta: IVISORReportMeta;
    locationDetails: IVISORLocationDetails;
    navigation: IVISORNavigation;
    fuelConsumptions?: IVISORFuelConsumption[];
    virs?: IVISORVirs;
    screenShots?: IVISORScreenshot[];
    keywords?: string[];
}

export interface IVISORInput {
    reportName: string;
    published: string;
    visorLocation: IVISORLocation;
    reportMeta: IVISORReportMeta;
    locationDetails: IVISORLocationDetails;
    navigation: IVISORNavigation;
    fuelConsumptions?: IVISORFuelConsumption[];
    virs?: IVISORVirs;
    screenShots?: IVISORScreenshot[];
    keywords?: string[];
}

export interface IVISORSmall {
    reportName: string;
    id: string;
    published: boolean;
    location: IVISORLocation;
    approved: boolean;
    reportMeta: IVISORReportMeta;
    keywords?: string[];
}

export interface ILocationFilter {
    system?: string;
    stellarObject?: string;
    planetLevelObject?: string;
    poiType?: string;
    jurisdiction?: string;
}

export interface IMetaFilter {
    followupTrailblazers?: string;
    followupDiscovery?: string;
    visorCode?: string;
    scVersion?: string;
    rsiHandle?: string;   
}

export interface ISearchFilter {
    name?: string;
    location?: ILocationFilter;
    meta?: IMetaFilter;
    published?: string;
    approved?: string;
    keyword?: string;
    length?: number;
    from?: number;
    to?: number;
}