import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: null,
      price: null,
      rating: null,
      Books: [
        { id: 1, title: "React Js", price: "25", rating: "2.5" },
        { id: 2, title: "Vue JS", price: "38", rating: "3.9" },
        { id: 3, title: "Angular Js", price: "46", rating: "8.5" }
      ],
      Book: [],
      modal: false,
      visible: true,
      update: false,
      editId: null
    };
  }
  onDismiss = () => {
    this.setState({ visible: false });
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: null,
      price: null,
      rating: null
    }));
  };
  handleChange = e => this.setState({ [e.target.id]: e.target.value });
  //Add a book
  addBook = e => {
    let id = Math.random() * 120;
    e.preventDefault();
    this.setState({ modal: false });

    let newBook = {
      id: id,
      title: e.target.title.value,
      price: e.target.price.value,
      rating: e.target.rating.value
    };

    this.setState({
      Books: [...this.state.Books, newBook]
    });
  };
  //delete book

  deleteBook = id => {
    let Books = this.state.Books.filter(book => book.id !== id);

    this.setState({
      Books
    });
  };
  //editBook
  editBook = id => {
    let book = this.state.Books.filter(book => {
      if (book.id === id) {
        this.setState({
          editId: id,
          title: book.title,
          price: book.price,
          rating: book.rating,
          modal: true,
          update: true
        });
      }
    });
    return book;
  };
  updatebook = event => {
    event.preventDefault();
    this.setState({ modal: false });
    console.log("update called");
    this.setState({
      Books: this.state.Books.map(item => {
        if (item.id === this.state.editId) {
          item["title"] = event.target.title.value;
          item["price"] = event.target.price.value;
          item["rating"] = event.target.rating.value;
          console.log(item);
          return item;
        }
        return item;
      })
    });
    this.setState({
      editId: null,
      id: null,
      title: null,
      price: null,
      rating: null,
      update: false
    });
  };

  render() {
    let books = this.state.Books;
    let count = 1;
    return (
      <div className="container">
        <h1 className="text-center text-info p-3">Book Store App</h1>
        <p className="text-left">
          <Button outline color="primary" onClick={this.toggle}>
            Add Book
          </Button>
        </p>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {books.length ? (
            this.state.Books.map(book => {
              return (
                <tbody key={book.id}>
                  <tr>
                    <th scope="row">{count++}</th>
                    <td>{book.title}</td>
                    <td>{book.price} $</td>
                    <td>{book.rating}</td>
                    <td>
                      <span
                        className="text-info"
                        onClick={() => this.editBook(book.id)}
                      >
                        <i className="fas fa-pencil-alt" />
                      </span>
                    </td>
                    <td>
                      <span
                        className="text-danger"
                        onClick={() => this.deleteBook(book.id)}
                      >
                        <i className="fas fa-trash" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <h1 className="text-center text-danger">
              You dont have any Books left
            </h1>
          )}
        </Table>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalBody
              className={
                this.state.update === true ? "bg-primary" : "bg-secondary"
              }
            >
              <ModalHeader toggle={this.toggle} className="text-white">
                {this.state.update === true ? "Update Book" : "Add a Book"}
              </ModalHeader>
              <Form
                className="pt-3"
                onSubmit={
                  this.state.update === true ? this.updatebook : this.addBook
                }
              >
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title..."
                    onChange={this.handleChange}
                    value={this.state.title}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Price..."
                    onChange={this.handleChange}
                    value={this.state.price}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="rating"
                    id="rating"
                    placeholder="Rating...."
                    onChange={this.handleChange}
                    value={this.state.rating}
                    required
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    block
                    color={this.state.update === true ? "warning" : "success"}
                  >
                    {this.state.update === true ? "Edit Todo" : "Add a Book"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
