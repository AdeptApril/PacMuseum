import React, { Component } from 'react';
//import { render } from 'react-dom';
import './Home.css';

const pics = {
    keychainshelf: require('./images/keychainshelf.jpg'),
    leftbottom: require('./images/leftbottom.jpg'),
    leftside: require('./images/leftside.jpg'),
    lefttop: require('./images/lefttop.jpg'),
    middlebottom: require('./images/middlebottom.jpg'),
    middletop: require('./images/middletop.jpg'),
    other: require('./images/other.jpg'),
    rightbottom: require('./images/rightbottom.jpg'),
    righttop: require('./images/righttop.jpg'),
    rug: require('./images/rug.jpg')
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        //const picsArr =[pics.keychainshelf, pics.leftbottom, pics.leftside, pics.lefttop, pics.middlebottom, pics.middletop, pics.other, pics.rightbottom, pics.righttop, pics.rug];

        this.state = {
            pic: pics.rug, //The links to the various included pictures
            currentPage: null, //Which page to be showing
            menuItems: [
                {text: 'Home'},
                {text: 'About'},
                {text: 'Collection'},
                {text: 'Visiting'},
            ],
        };
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
            this.interval = setInterval(() => {
                this.setState({
                    pic: setNextBackground(this),
                })
            }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleClick(activeItem) {
        return e => {
            e.preventDefault();

            this.setState({
                activeItem,
                currentPage: activeItem.toString(),
                activeItemPosition: document.getElementById(activeItem).offsetLeft,
                activeItemColor: window.getComputedStyle(document.getElementById(activeItem)).getPropertyValue('background-color'),
            })
        }
    }

    //This should be called when the background picture should be changed.
    //TODO: This could be random pictures called from the SQL database -- possibly just the key objects
    handlePictureChange(pictureName) {
        this.setState({picture: pictureName});
        switch(pictureName) {
            case "rug":
                this.setState({pic: pics.rug});
                break;
            default:
                this.setState( {pic:pics.rug});
        }
        //For Debugging:
        //console.log(this.state.picture + " " + pictureName);
    }

    render() {
        const menuItems = this.state.menuItems.map(item => <MenuItem item={ item } handleClick={ this.handleClick }/>)
        return (
            <div className="full_grid">
                <div><img className="background-img" alt="" src={this.state.pic}/></div>
                {/*this.state.pic*/}
                {/*TODO: remake all the items as functions (e.g., showTitleItem(), showLeftSideItems())*/}
                {/*TODO: remake items as a list of items, rather than this more prescriptive way*/}
                {/*Top row is a link for the Bio / a header*/}
                <div className="row_1">
                    <div className="menu">
                        {/*<span className='menu-item--active' style={{ top: this.state.activeItemPosition, backgroundColor: this.state.activeItemColor }}/>*/}
                        { menuItems }
                        {/*                        <p className="menu-item"
                           onClick={() => this.showInfoOn("loveStory")}>
                            Love Story Real-Time Demo
                        </p>*/}
                    </div>
                </div>
                {/*This row has the menu*/}
                <div className="row_2">
                    <div>
                        <p className="header">This is a header</p>
                    </div>
                    <div className="row_2_right">
                        {/*
                        <p className="projects-right"
                           onMouseEnter={() => this.handlePictureChange("loveStory")}
                           onClick={() => this.showInfoOn("loveStory")}>
                            Love Story Real-Time Demo
                        </p>
                        */}
                    </div>
                </div>
                <div className="further-info">
                    {/*Further info placed here*/}
                    <div className="further-info">
                        <div>
                            {/*{this.state.currSubDiv}*/}
                            The current page is: {this.state.currentPage}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function MenuItem(props) {
    return (
        <div
            className='menu-item'
            id={ props.item.text }
            onClick={ props.handleClick(props.item.text) }
        >
            { props.item.text }
        </div>
    )
}

//Advance to next picture in structure, going back to the beginning if at the end
//TODO: There _has_ to be a better way to do this.
//I tried using a picNum variable in state, along with an array of the pics, but the variables became undefined immediately
//So reverting to this (working) version.
function setNextBackground(props) {
    switch(props.pic) {
        case pics.rug:
            props.pic = pics.righttop;
            break;
        case pics.righttop:
            props.pic = pics.keychainshelf;
            break;
        case pics.keychainshelf:
            props.pic = pics.leftbottom;
            break;
        case pics.leftbottom:
            props.pic = pics.leftside;
            break;
        case pics.leftside:
            props.pic = pics.lefttop;
            break;
        case pics.lefttop:
            props.pic = pics.rightbottom;
            break;
        case pics.rightbottom:
            props.pic= pics.other;
            break;
        case pics.other:
            props.pic = pics.middlebottom;
            break;
        case pics.middlebottom:
            props.pic = pics.middletop;
            break;
        case pics.middletop:
            props.pic = pics.rug;
            break;
        default:
            props.pic = pics.rug;
    }
            return props.pic;
}


export default Home;