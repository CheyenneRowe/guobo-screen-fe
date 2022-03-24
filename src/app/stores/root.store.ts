import { RouterStore } from 'mobx-react-router';
import { observable } from 'mobx';
import { KubesphereReq } from '@src/app/utils/req';

export default class RootStore {
    routing: RouterStore;

    @observable
    workSpaceName = '';

    constructor() {
        this.routing = new RouterStore();
        // this.getWorkSpaceName();
    }

    getWorkSpaceName = async () => {
        try {
            const result = await KubesphereReq.GET(
                '/tenant.kubesphere.io/v1alpha2/workspaces',
                {}
            );
            const name = result?.items[0]?.metadata?.name;
            this.workSpaceName = name;
            console.log('name', name);
        } catch (e) {
            console.error('fetch workspaces name error', e);
        }
    };
}
