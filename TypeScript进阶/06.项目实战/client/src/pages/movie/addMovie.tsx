import React from "react"
import MovieForm from "../../components/MovieForm";
import { MovieService } from "../services/MovieService";

export default class extends React.Component {
    render(){
        return (
            <h1>
                <MovieForm onSubmit={async (movie) => {
                  const resp = await MovieService.add(movie)
                  return resp.data ? '' : resp.err;
                }}></MovieForm>
            </h1>
        );
    }
}