import React, {Component} from "react";

import {
    Button,
    Row,
    Card,
    CardHeader,
    CardBody,
    Badge,
} from "reactstrap";

class GameCard extends Component {

    render() {
        const {game, func} = this.props;

        const thumbnailImg = game.cover && game.cover.url
        ? <img alt={game.id} src={`http:${game.cover.url}`} width={160} height={200}/>
              : <img src="http://via.placeholder.com/160x200?text=NoImage" alt="noImage"/>

        let platformArr = [];
        if (game.platforms && game.platforms.length) {
            game.platforms.forEach((platform) => {
                platformArr.push(platform.name)
            })
        }
        const platforms = game.platforms
        ? <div className="game-item-platforms">{platformArr.join(", ")}</div>
              : <strong>N/A</strong>;

        let genreArr = [];
        if (game.genres && game.genres.length) {
            game.genres.forEach((genre) => {
                genreArr.push(genre.name)
            })
        }
        const genres = game.genres 
        ?  <div className="game-item-platforms">{genreArr.join(", ")}</div>
              : <strong>N/A</strong>

        let gameModesArr = [];
        if (game.game_modes && game.game_modes.length) {
            game.game_modes.forEach((mode) => {
                gameModesArr.push(mode.name)
            })
        }

        const gameModes = game.game_modes
        ? <div className="game-item-platforms">{gameModesArr.join(", ")}</div>
              : <strong>N/A</strong>

        const rating = game.rating > 80 
        ? <Badge color="success" className="rating float-center m-2">Rating: {parseFloat(game.rating).toFixed(2)}</Badge>
              : <Badge color="warning" className="rating float-center m-2">Rating: {parseFloat(game.rating).toFixed(2)}</Badge>

        return(
            <Card className="col-lg-5 m-2">
                <CardHeader>
                    <div className="title text-center mt-0 card-title">
                        <h3>
                            {game.name}
                        </h3>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="game-item-img">
                        {thumbnailImg}
                    </div>
                    <Row className="justify-content-center">
                        {rating}
                    </Row>
                    <div className="card-content text-uppercase">
                        <h4 className="mb-0">Platforms</h4>
                        <strong>{platforms}</strong>
                    </div>
                    <div className="card-content text-uppercase">
                        <h4 className="mb-0">Genres</h4>
                        <strong>{genres}</strong>
                    </div>
                    <div className="card-content text-uppercase mb-3">
                        <h4 className="mb-0">Game Mode</h4>
                        <strong>{gameModes}</strong>
                    </div>
                    <div className="card-content">
                        <Button
                            color="info"
                            onClick={func}
                            >
                            More Details
                        </Button>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default GameCard;