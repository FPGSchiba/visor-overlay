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
    approved?: string;
    public?: string;
    keyword?: string;
    length?: number;
    from?: number;
    to?: number;
}