class Demo extends React.Component {
    constructor() {
        super( props );

        this.state = {
            data: props.data,
        };
    }

    remove(index) {
        this.setState(({ data }) => {
            data.splice(index, 1);
            return {
                data,
            };
        });
    }

    handleClick = index => (event) => {
        event.preventDefault();
        this.remove(index);
    };

    renderAction = (o, row, index) => (
        <a href="#" onClick={this.handleClick(index)}>
            Delete
        </a>
    );

    render() {
        const { state } = this;
        const columns = [
            { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
            { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            { title: 'Operations', dataIndex: '', key: 'x', render: this.renderAction },
        ];
        return (
            <Table columns={columns} data={state.data} className="table" rowKey={record => record.a} />
        );
    }
}