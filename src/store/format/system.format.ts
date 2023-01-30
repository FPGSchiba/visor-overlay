export interface ISystem {
    id: string;
    name: string;
    stellarObjects: string[]
}

export interface IStellarObject {
    id: string;
    name: string;
    type: string;
    planetLevelObjects?: string[];
}

export interface IPlanetLevelObject {
    id: string;
    name: string;
    type: string;
}

export interface ICompleteSystem {
    id: string;
    name: string;
    stellarObjects: ICompleteStellarObject[]
}

export interface ICompleteStellarObject {
    id: string;
    name: string;
    type: string;
    planetLevelObjects?: IPlanetLevelObject[]
}

export interface ISystemSmall {
    name: string;
    id: string;
}

export interface ISystemInput {
    name: string;
    stellarObjects: IStellarObjectInput[];
}

export interface IStellarObjectInput {
    name: string;
    type: string;
    planetLevelObjects?: IPlanetLevelObjectInput[];
}

export interface IPlanetLevelObjectInput {
    name: string;
    type: string;
}