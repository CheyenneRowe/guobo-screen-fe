
type CategoryStatus = 'enabled' | 'disabled';
type AppVersionStatus = 'active' | 'passed' | 'rejected' | 'suspended' | 'submitted' | 'draft';
type AppStatus ='active' | 'passed' | 'rejected' | 'suspended' | 'submitted' | 'draft';
type ReviewStatus ='submitted' | 'admin-rejected' | 'admin-passed';
export interface ICategory {
    name: string;
    category_id: string;
    description?: string;
    owner?: string;
    status?: CategoryStatus;
    locale?: string; // json string
    create_time?: string;
    id?: string; // 前端字段，等于category_id
}

export interface IAppVersion {
    app_id: string;
    version_id: string;
    description: string;
    name: string;
    owner: string;
    package_name: string;
    review_id: string;
    sequence: number;
    status: AppVersionStatus;
    create_time: string;
    status_time: string;
    update_time: string;
    time?: string;
}
export interface IApp {
    app_id: string;
    name: string;
    owner: string;
    abstraction: string; // markdown string
    app_version_types: string;
    category_set: Array<ICategory>;
    create_time: string;
    description: string;
    home: string;
    icon: string;
    isv: string;
    latest_app_version: IAppVersion;
    screenshots: string;
    status: AppStatus;
    status_time: string;
    update_time: string;
}

interface Conditions {
    status: string;
}
export interface FetchListParams {
    limit?: number;
    page?: number;
    sortKey?: string;
    prefix?: string;
    conditions?: Conditions;
    reverse?: boolean;
}

export interface FetchListResult {
    items: Array<IApp>;
    total_count: number;
}


export interface ICluster {
    additional_info: string;
    app_id: string;
    cluster_id: string;
    create_time: string;
    description: string;
    env: string;
    name: string;
    owner: string;
    runtime_id: "default",
    status: string;
    status_time: string;
    transition_status: string;
    upgrade_time: string;
    version_id: string;
    zone: string;
}
export interface IVersion{
    app_id: string;
    create_time: string;
    description: string;
    name: string;
    owner: string;
    package_name: string;
    review_id: string;
    sequence: number;
    status: string;
    status_time: string;
    type: string;
    update_time: string;
    version_id: string;

}
export interface IService {
    name: string;
    app: IApp;
    cluster: ICluster;
    version: IVersion;
}
export interface FetchServiceListParams {
    limit?: number;
    page?: number;
    sortKey?: string;
    workspaceName?: string;
    conditions?: Conditions;
    reverse?: boolean;
}

export interface FetchServiceListResult {
    items: Array<IService>;
    total_count: number;
}

export interface IMetadata{
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string|null;
    annotations: {
        "kubesphere.io/alias-name": string;
        "kubesphere.io/creator": string;
    }
}
export interface ITSpec {
    manager: string;
    networkIsolation: boolean;
}
export interface ITemplate {
    metadata: IMetadata;
    spec: ITSpec;
}
export interface ISpec {
    template: ITemplate;
    placement: Object;
}
export interface IWorkspace{
    kind: string;
    apiVersion: string;
    metadata: IMetadata;
    spec: ISpec
}
export interface FetchWorkspaceResult {
    items: Array<IWorkspace>;
    totalItems: number;
}
export interface IReview {
    app: IApp;
    app_id: string;
    app_name: string;
    review_id: string;
    status: ReviewStatus;
    status_time: string;
    version_id: string;
    version_name: string;
    version_type: string;
}
export interface FetchReviewListResult {
    items: Array<IReview>;
    total_count: number;
}
export interface EditServiceInfoParams extends ICluster{
    name: string;
    app: IApp;
    version: IVersion;
}

export interface IAppStoreState {
    category_id: string,
    isv: string,
    owner: string,
    keyword: string,
}

export interface IPackageInfo {
    app_id: string,
    package: string,
    version_id: string,
}

export interface IIsv {
    name: string,
    fullName: string,
    id: string,
    type: string,
}


export type IAppStoreStateTypes = 'category_id' | 'isv' | 'owner' | 'keyword' | 'review_status';

export interface IAppVersionPreviewProps {
    versions: Array<IAppVersion>,
    versionFiles: [],
    versionId: string,
    handleVersionIdChanged: Function,
}

