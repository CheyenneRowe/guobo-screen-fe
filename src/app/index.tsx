import React from 'react';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Provider } from 'mobx-react';
import PublishedAppStore from '@src/app/stores/app.store';
import RootStore from '@src/app/stores/root.store';
import IndexRouter from '@src/app/routers';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    rootStore = new RootStore();
    history = syncHistoryWithStore(createHashHistory(), this.rootStore.routing);
    appStore = new PublishedAppStore();

    render() {
        return (
            <Provider
                rootStore={this.rootStore}
                appStore={this.appStore}
            >
                <Router history={this.history}>
                    <IndexRouter />
                </Router>
            </Provider>
        );
    }
}

export default App;
