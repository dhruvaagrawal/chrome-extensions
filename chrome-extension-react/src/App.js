import React, { Component } from 'react';
import './App.css';
import * as ReactBootstrap from "react-bootstrap";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoaded: false
    }
    this.tableRef = React.createRef()
    this.downloadCSV = this.downloadCSV.bind(this)
    this.exportTableToCSV = this.exportTableToCSV.bind(this)
  }

  componentDidMount() {
    // Fetching dummy data from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      });
  }

  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
  }

  exportTableToCSV(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("ReactBootstrap.Table");
  
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
      csv.push(row.join(","));    
    }

    // Download CSV
    this.downloadCSV(csv.join("\n"), filename);
  }

  // document.querySelector("button").addEventListener("click", function() {
  //   var html = document.querySelector("ReactBootstrap.Table").outerHTML;
  //   exportTableToCSV(html, "table.csv");
  // });

  render() {
    var { isLoaded, items } = this.state
    // var html = document.getElementById("react-table").outerHTML;
    var html = this.tableRef.current
    console.log(html)
    if(!isLoaded) {
      return <div><h2>Loading...</h2></div>
    } else {
      return (
        <div className="App" ref={this.tableRef}>
          <ReactBootstrap.Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
              </tr>
            </thead>
            <tbody>
              { items.map(item => (
                <tr key = { item.id }>
                  <td>{ item.name }</td>
                  <td>{ item.username }</td>
                  <td>{ item.email.toLowerCase() }</td>
                  <td>{ item.address.suite + ', ' + item.address.street + item.address.city + ', ' + item.address.zipcode }</td>
                  <td>{ item.phone }</td>
                  <td>{ 'https://www.' + item.website + '/'}</td>
                  <td>{ item.company.name }</td>
                </tr>
              ))}
            </tbody>
          </ReactBootstrap.Table>
          {/* <button onClick={this.exportTableToCSV(html, "table.csv")}>Export HTML Table to CSV File</button> */}
        </div>
      );
    }
  }
}

export default App;
