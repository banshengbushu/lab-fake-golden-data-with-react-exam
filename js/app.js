const App = React.createClass({
    getInitialState: function() {
        return {
            isEditor: true,
            elements: []
        }
    },

    addElement: function(element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },
    render: function() {
        const isEditor = this.state.isEditor;
        return <div className="col-md-5 col-md-offset-3">
            <ReactRouter.Link to = "/previewer">
                {isEditor?"Preview":"Editor"}

            </ReactRouter.Link>

            {this.props.children && React.cloneElement(this.props.children,{
                elements:this.state.elements,
                onAdd:this.addElement,
                onRemove:this.deleteElement
            }) }
            </div>;

        // const isEditor = this.state.isEditor;
        // return <div>
        //     <div className="col-md-5 col-md-offset-3">
        //     <button onClick={this.toggle} className="btn btn-primary btn-lg btn-block" >{isEditor ? "Preview" : "Edit"}</button>
        //         </div>
        //
        // </div>;
    }
});

const Editor = React.createClass({
    render: function () {
        return <div>
            <Left elements={this.props.elements} onDelete={this.props.onDelete} />
            <Right onAdd={this.props.onAdd}/>
        </div>;
    }
});

const Left = React.createClass({
    remove: function(index) {
        this.props.onDelete(index);
    },
    render: function() {
        const elements = this.props.elements.map((ele, index) => {
            if(ele!==undefined) {
                return <div key={index} className="col-md-6 col-md-offset-1" id="left">
                    <input type={ele}/>
                    <button className="btn btn-danger" onClick={this.remove.bind(this, index) }>-</button>
                </div>;
            }
        });

        return <div>
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function() {
        return <div id="right" className="form-group col-md-9 col-md-offset-9">
            <h3 className="radio"><input type="radio" name="element" value="text"/>Text</h3>
            <h3 className="radio"><input type="radio" name="element" value="date" />Date</h3>
            <button onClick={this.add} className="btn btn-info" >+</button>
        </div>
    }
});

const Previewer = React.createClass({

    render: function () {
            const elements = this.props.elements.map((ele, index) => {
                    return <div key={index} className="col-md-3 col-md-offset-3">
                           <input type={ele} className="input-group-md"/>
                           </div>
            });

        return <div id="preview">
            {elements}
            <div className="col-md-5 col-md-offset-5">
                <div id="submit">
            <button className="btn btn-info">Submit</button>
                </div>
            </div>
        </div>;
    }
});
ReactDOM.render(
    <ReactRouter.Router >
        <ReactRouter.Route path="/" component = {App}>
            <ReactRouter.IndexRoute  component = {Editor}/>
            <ReactRouter.Route path="/previewer" component = {Previewer}/>
        </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));