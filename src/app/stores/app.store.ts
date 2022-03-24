import { action, observable } from 'mobx';
import { getTopoData } from '@src/app/services/app.sevice'

export default class appStore {
    timer: any = null;
    gap: number = 60000;   // 每隔1分钟重新获取数据

    // 获取拓扑数据
    @observable topoChartInfo: any = [];
    @observable count: number = 0;
    @action getTopoChartInfo = async (id) => {
         let _foo = async () => {    // 循环调取拓扑接口
            await getTopoData(id).then((content: any) => {
                this.topoChartInfo = content || [];
                this.count++;
                this.timer = setTimeout(_foo, 60000);
            }).catch(err => clearTimeout(this.timer));
        };
        await _foo();
    }
    @action clearTimer = () => {
        clearTimeout(this.timer);
    }
}
