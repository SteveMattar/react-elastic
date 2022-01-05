import React from 'react';
import './App.css';
import {
    ReactiveBase,
} from "@appbaseio/reactivesearch";
import SingleList from "@appbaseio/reactivesearch/lib/components/list/SingleList";
import ReactiveList from "@appbaseio/reactivesearch/lib/components/result/ReactiveList";
import ResultList from "@appbaseio/reactivesearch/lib/components/result/ResultList";

interface Item {
    _id: string | number;
    flag: string;
    name: string;
    nativeName: string;
    capital: string;
    region: string;
}

const elasticURL = "http://your-elasticsearch-cluster:9200"
const app = "your-elasticsearch-index"
const credentials = "user:password"


function App() {
    return (
        <div className="App">
            <header></header>
            <body>
                <ReactiveBase
                    app={app}
                    url={elasticURL}
                    credentials={credentials}
                    className="App-content"
                    theme={{
                        colors: {
                            primaryColor: "#41ABF5"
                        }
                    }}
                    transformResponse={async (elasticsearchResponse, componentId) => {
                        return {
                            response: [{
                                ...elasticsearchResponse.responses[0]
                            }]
                        };
                    }}
                >
                    <div className="filters-search-container">
                        <div className="search-container">
                            <SingleList
                                size={300}
                                componentId="CollectionSensor"
                                dataField="region.keyword"
                                title={app}
                            />
                        </div>
                    </div>
                    <div className="result-map-container">
                        <ReactiveList
                            componentId="SearchResult"
                            dataField="name"
                            pagination
                            size={10}
                            react={{
                                and: ['CollectionSensor'],
                            }}
                            render={({data}) => (
                                <ReactiveList.ResultListWrapper>
                                    {data.map((item: Item) => (
                                        <ResultList key={item._id}>
                                            <ResultList.Image src={item.flag} />
                                            <ResultList.Content>
                                                <ResultList.Title>
                                                    <div className="title-list"
                                                        dangerouslySetInnerHTML={{__html: item.name,}}
                                                    />
                                                </ResultList.Title>
                                                <ResultList.Description>
                                                    <div className="flex column justify-space-between">
                                                        <div>
                                                            <div>
                                                                Native Name: {' '}<span className="desc-list">{item.nativeName}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                Capital:<span className="desc-list">{item.capital}</span>
                                                            </div>
                                                        </div>
                                                        <span className="pub-year">Region {item.region}</span>
                                                    </div>
                                                </ResultList.Description>
                                            </ResultList.Content>
                                        </ResultList>
                                    ))}
                                </ReactiveList.ResultListWrapper>
                            )}
                        />
                    </div>
                </ReactiveBase>
            </body>
        </div>
    );
}

export default App;
