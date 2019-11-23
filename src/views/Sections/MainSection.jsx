import React from "react";
import classnames from "classnames";

import axios from "axios";
import GameCard from "components/GameComponent/GameCard.jsx";
import LoadingOverlay from "react-loading-overlay";

// reactstrap components
import {
    Button,
    Input,
    Container,
    Row,
    Col,
    NavItem,
    NavLink,
    Nav,
    Modal
} from "reactstrap";

class MainSection extends React.Component {
    constructor(props) {
        super(props);

        this.fields = "fields *, genres.*, platforms.*, cover.*, release_dates.*, release_dates.platform.*, game_engines.*, game_modes.*, similar_games.name, franchise.*;"
        this.baseWhereClause = "rating != null";
        this.platformWhereClause = "";
        this.genreWhereClause = "";
        this.sortClause = "rating desc";

        this.state = {
            inputFocus: false,
            gameSearchPlaceholder: "Halo 2",
            selectGameInterval: undefined,
            platformArray: [],
            genreArray: [],
            gameArray: [],
            gameDetail: undefined,
            infoModal: false,
            isActive: false
        };

        this.placeholderGameSearchCount = 0;
        this.IGDB_KEY = "53420a85552e5550df93f4945c400cd9";
        this.typingInterval = 100;
    }
    componentDidMount() {
        this.setState({
            pills: 1,
            pillsPlatform: 0,
            pillsGenre: 0
        });

        this.selectGameInterval = setInterval(() => {
            this.selectGameSearchPlaceholder();
        }, 4000);

        this.typingTimer = null;

        this.loadPlatform();
        this.loadGenre();
        this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
    }

    selectGameSearchPlaceholder() {
        const placeholderGameSearches = ["Halo 2", "Dota 2", "League of Legends", "Call of Duty", "The Legend of Zelda", "Fortnite", "Atari"];

        if (placeholderGameSearches.length - 1 !== this.placeholderGameSearchCount) {
            this.placeholderGameSearchCount = this.placeholderGameSearchCount + 1;
        } else {
            this.placeholderGameSearchCount = 0;
        }

        this.setState({
            gameSearchPlaceholder: placeholderGameSearches[this.placeholderGameSearchCount]
        });
    }

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });

        if (stateName === "pills") {
            switch (index) {
                case 1:
                    this.baseWhereClause = "rating != null";
                    this.sortClause = "rating desc";

                    this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
                    break;
                case 2:
                    this.baseWhereClause = "rating >= 90";
                    this.sortClause = "popularity desc";
                    this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
                    break;
                case 3:
                    this.baseWhereClause = "release_dates.date > " + Math.floor(Date.now() / 1000);
                    this.sortClause = "release_dates.date asc";

                    this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
                    break;
                case 4:
                    document.getElementById("searchBar").focus();
                    this.setState({
                        pillsPlatform: 0,
                        pillsGenre: 0,
                    });
                    this.platformWhereClause = "";
                    this.genreWhereClause = "";
                    break;
                default:
                    break;
            }

        } 

        if (stateName === "pillsPlatform") {
            if (index === 0) {
                this.platformWhereClause = "";
            } else {
                this.platformWhereClause = " & platforms = (" + index +")";
            }

            this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
        }

        if (stateName === "pillsGenre") {
            if (index === 0) {
                this.genreWhereClause = "";
            } else {
                this.genreWhereClause = " & genres = (" + index +")";
            }

            this.loadGames(this.baseWhereClause, this.platformWhereClause, this.genreWhereClause, this.sortClause);
        }
    };

toggleModal = modalState => {
    this.setState({
        [modalState]: !this.state[modalState]
    });
};

loadPlatform() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    axios({
        url: `${proxy}https://api-v3.igdb.com/platforms`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': this.IGDB_KEY
        },
        data: `fields *; limit 50;`
    })
        .then(resp => {
        let array = [];
        resp.data.map(platform => {
            return array.push(platform.id)
            
        })

        const whereQuery = `where id = (${array[Math.ceil(Math.random() * 4)]}, ${array[4 + Math.ceil(Math.random() * 4)]}, ${array[8 + Math.ceil(Math.random() * 4)]}, ${array[12 + Math.ceil(Math.random() * 4)]}, ${array[16 + Math.ceil(Math.random() * 4)]})`

        axios({
            url: `${proxy}https://api-v3.igdb.com/platforms`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': this.IGDB_KEY
            },
            data: `fields *; ${whereQuery};`
        })
            .then(response => {
            this.setState({
                platformArray: response.data
            }) 
        })
            .catch(error => {
            console.error(error);
        })
    })
        .catch(err => {
        console.error(err);
    });
}

loadGenre() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    axios({
        url: `${proxy}https://api-v3.igdb.com/genres`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': this.IGDB_KEY
        },
        data: `fields *; limit 50;`
    })
        .then(resp => {
        let array = [];
        resp.data.map(genre => {
            return array.push(genre.id)
        })

        const whereQuery = `where id = (${array[Math.ceil(Math.random() * 4)]}, ${array[4 + Math.ceil(Math.random() * 4)]}, ${array[8 + Math.ceil(Math.random() * 4)]}, ${array[12 + Math.ceil(Math.random() * 4)]}, ${array[16 + Math.ceil(Math.random() * 4)]})`

        axios({
            url: `${proxy}https://api-v3.igdb.com/genres`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': this.IGDB_KEY
            },
            data: `fields *; ${whereQuery};`
        })
            .then(response => {
            this.setState({
                genreArray: response.data
            }) 
        })
            .catch(error => {
            console.error(error);
        })
    })
        .catch(err => {
        console.error(err);
    });
}

searchGame(value) {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    this.setState({
        gameArray: []
    })

    let searchClause = `search "` + value.trim() + `"`;

    axios({
        url: `${proxy}https://api-v3.igdb.com/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': this.IGDB_KEY
        },
        data: `${this.fields} ${searchClause};`
    })
        .then(response => {
        this.setState({
            gameArray: response.data
        })
    })
}

loadGames(base, platform, genre, sort) {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const whereClause = "where " + base + platform + genre;
    const sortClause = "sort " + sort;

    document.getElementById("searchBar").value = "";

    this.setState({
        gameArray: [],
        isActive: true
    })

    axios({
        url: `${proxy}https://api-v3.igdb.com/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': this.IGDB_KEY
        },
        data: `${this.fields} limit 50; ${whereClause}; ${sortClause};`
    })
        .then(response => {
        this.setState({
            gameArray: response.data,
            isActive: false
        })


    })
}

render() {
    let gameName = this.state.gameDetail
    ? <strong>{this.state.gameDetail.name}</strong>
        : <strong>N/A</strong>;

    let platforms = this.state.gameDetail
    ? <strong>{this.state.gameDetail.platforms.map(data => {
                return <h6 className="modal-body-text" key={data.id}>
                    <strong>{data.name}</strong>
                </h6>;
            })}</strong>
        : <strong>N/A</strong>

    let genres = this.state.gameDetail
    ? <strong>{this.state.gameDetail.genres.map(data => {
                return <h6 className="modal-body-text" key={data.id}>
                    <strong>{data.name}</strong>
                </h6>;
            })}</strong>
        : <strong>N/A</strong>

    let releasedDates = this.state.gameDetail
    ? <strong>{this.state.gameDetail.release_dates.map(data => {
                return <h6 className="modal-body-text" key={data.id}>
                    <strong>{data.platform.name}</strong> - <strong>{data.human}</strong>
                </h6>;
            })}</strong>
        : <strong>N/A</strong>

    let franchise = this.state.gameDetail
    if (franchise) {
        if (franchise.franchise) {
            franchise = <strong>{franchise.franchise.name}</strong>
        } else {
            franchise = <strong>N/A</strong>
        }
    } else {
        franchise = <strong>N/A</strong>
    }
    
    let summary = this.state.gameDetail
    ? <strong>{this.state.gameDetail.summary}</strong>
        : <strong>N/A</strong>;
    
    let similarGames = this.state.gameDetail
    ? <strong>{this.state.gameDetail.similar_games.map(data => {
                return <h6 className="modal-body-text" key={data.id}>
                    <strong>{data.name}</strong>
                </h6>;
            })}</strong>
        : <strong>N/A</strong>


    return (
        <div className="section section-basic mt-5" id="main-section">
            <LoadingOverlay
                active={this.state.isActive}
                spinner
                text='Loading Content...'
                >
                <Container>
                    <Row className="mt-5">
                        <Col>
                            <Nav className="nav-pills-info nav-pills-icons justify-content-center" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pills === 1
                                        })}
                                        onClick={e => this.toggleTabs(e, "pills", 1)}
                                        href="#placeholder"
                                        >
                                        <i className="fa fa-fire" />
                                        Greatest of All Time
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pills === 2
                                        })}
                                        onClick={e => this.toggleTabs(e, "pills", 2)}
                                        href="#placeholder"
                                        >
                                        <i className="fa fa-chart-line" />
                                        Trending
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pills === 3
                                        })}
                                        onClick={e => this.toggleTabs(e, "pills", 3)}
                                        href="#placeholder"
                                        >
                                        <i className="tim-icons icon-time-alarm" />
                                        Coming Soon
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pills === 4
                                        })}
                                        onClick={e => this.toggleTabs(e, "pills", 4)}
                                        href="#placeholder"
                                        >
                                        <i className="fa fa-search" />
                                        Search
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>

                    <Row className ="mt-1">
                        <Col>
                            <Input placeholder= {this.state.gameSearchPlaceholder} 
                                type="text" 
                                id="searchBar"
                                onKeyUp={e => this.searchGame(e.target.value)}
                                onClick={e => this.toggleTabs(e, "pills", 4)}/>
                        </Col>
                    </Row>
                    <Row className="mt-5 justify-content-center text-uppercase">
                        Platform Selection
                    </Row>
                    <Row>
                        <Col>
                            <Nav className="nav-pills-info nav-pills-icons justify-content-center" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pillsPlatform === 0
                                        })}
                                        onClick={e => this.toggleTabs(e, "pillsPlatform", 0)}
                                        href="#placeholder"
                                        >
                                        <i className="tim-icons icon-atom" />
                                        All
                                    </NavLink>
                                </NavItem>
                                {this.state.platformArray.map(platform => {
                                    return(
                                        <NavItem key={platform.id}>
                                            <NavLink
                                                className={classnames({
                                                    "active show": this.state.pillsPlatform === platform.id
                                                })}
                                                onClick={e => this.toggleTabs(e, "pillsPlatform", platform.id)}
                                                href="#placeholder"
                                                >
                                                <i className="tim-icons icon-compass-05" />
                                                {platform.name}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })}
                            </Nav>
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-center text-uppercase">
                        Genre Selection
                    </Row>
                    <Row>
                        <Col>
                            <Nav className="nav-pills-info nav-pills-icons justify-content-center" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            "active show": this.state.pillsGenre === 0
                                        })}
                                        onClick={e => this.toggleTabs(e, "pillsGenre", 0)}
                                        href="#placeholder"
                                        >
                                        <i className="tim-icons icon-atom" />
                                        All
                                    </NavLink>
                                </NavItem>
                                {this.state.genreArray.map(genre => {
                                    return(
                                        <NavItem key={genre.id}>
                                            <NavLink
                                                className={classnames({
                                                    "active show": this.state.pillsGenre === genre.id
                                                })}
                                                onClick={
                                                    e => this.toggleTabs(e, "pillsGenre", genre.id)
                                                }
                                                href="#placeholder"
                                                >
                                                <i className="tim-icons icon-controller" />
                                                {genre.name}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })}
                            </Nav>
                        </Col>
                    </Row>

                    <div className="result-components">
                        <div className="container">
                            <Row className="justify-content-center">
                                {this.state.gameArray.map(game => {
                                    return <GameCard key={game.id} game={game} func={() => {
                                            this.setState({
                                                gameDetail: game
                                            })
                                            this.toggleModal("infoModal")
                                        }}/>
                                })}
                            </Row>
                        </div>
                    </div>
                    {/* Start Info Modal */}
                    <Modal
                        isOpen={this.state.infoModal}
                        toggle={() => this.toggleModal("infoModal")}
                        >
                        <div className="modal-header justify-content-center">
                            <button
                                className="close"
                                onClick={() => this.toggleModal("infoModal")}
                                >
                                <i className="tim-icons icon-simple-remove" />
                            </button>
                            <h4 className="title title-up">{gameName}</h4>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <Col sm="4">
                                    <h6 className="modal-body-text">Platforms</h6>
                                </Col>
                                <Col sm="8">
                                    {platforms}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <h6 className="modal-body-text">Genres</h6>
                                </Col>
                                <Col sm="8">
                                    {genres}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <h6 className="modal-body-text">Released Dates</h6>
                                </Col>
                                <Col sm="8">
                                    {releasedDates}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <h6 className="modal-body-text">Franchise</h6>
                                </Col>
                                <Col sm="8">
                                    <h6 className="modal-body-text">{franchise}</h6>
                                </Col>
                            </Row>
                            <Row className ="mt-3">
                                <Col>
                                    <h6 className="modal-body-text">Summary</h6>
                                </Col>
                            </Row>
                            <p className ="mb-3">
                                {summary}
                            </p>
                            <Row>
                                <Col sm="4">
                                    <h6 className="modal-body-text">Similar Games</h6>
                                </Col>
                                <Col sm="8">
                                    {similarGames}
                                </Col>
                            </Row>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <Button
                                color="default"
                                type="button"
                                onClick={() => this.toggleModal("infoModal")}
                                >
                                Close
                            </Button>
                        </div>
                    </Modal>
                    {/* End Info Modal */}
                </Container>
            </LoadingOverlay>
        </div>
    );
}
}

export default MainSection;
