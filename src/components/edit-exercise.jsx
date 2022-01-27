import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditExercisesWithRouter = (props) => {
  const navigationParams = useParams();
  return <EditExercises props={{ ...props, ...navigationParams }} />;
};
class EditExercises extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDesription = this.onChangeDesription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      desription: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.props.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: parseInt(response.data.duration),
          date: new Date(response.data.date),
        });
      })
      .catch((error) => console.log(error));

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDesription(e) {
    this.setState({
      desription: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.desription,
      duration: parseInt(this.state.duration),
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .patch(
        "http://localhost:5000/exercises/update/" + this.props.props.id,
        exercise
      )
      .then((res) => console.log(res.data));

    setTimeout(() => {
      window.location = "/";
    }, 5000);
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              //ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.desription}
              onChange={this.onChangeDesription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in Minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercisesWithRouter;
