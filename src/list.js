// list component
var List = React.createClass({
    name: 'list',
    mixins: [getCommonMixin],
    
    // attribute definitions
    getAttributes: function() {
        var attributes = [
            { name:'boxClass', type:'string', required:false, defaultValue:'', note:'container CSS class' },
            { name:'items', type:'array', required:false, defaultValue:[], note:'list items' }
        ];
        return attributes;
    },
    
    onClick: function(event) {
        var target = $(event.target);
        if (target.hasClass('listelement-text-container') ||
            target.hasClass('listelement-icon') ||
            target.hasClass('listelement-content-container')
            ) {
            var container = target.parents('.listelement-container')[0];
            var elementId = $(container).attr('data-id');
            this.fire('select', [elementId]);
        }
    },
    
    render: function() {
        // set content display
        var itemElements = [];
        // normalize items
        this.normalizeItems(this.state.items);
        for (var i = 0; i < this.state.items.length; i++) {
            var listElement = this.state.items[i];
            var listElementKey = 'list-item-' + listElement.id;
            itemElements.push(
                <ListElement data={ listElement } key={ listElementKey } />
            );
        }
        return (
            <div className={ this.state.containerClassNames.join(' ') }
                onClick={ this.onClick }
                >
                { itemElements }
                <div className="div-clear-both"></div>
            </div>
        );
    }
    
});

// List Element Component
var ListElement = React.createClass({
    name: 'listelement',
    mixins: [getCommonMixin],
    
    // attribute definitions
    getAttributes: function() {
        var attributes = [
            { name:'boxClass', type:'string', required:false, defaultValue:'', note:'container CSS class' },
            { name:'iconClass', type:'string', required:false, defaultValue:'', note:'icon CSS class' },
            { name:'id', type:'string', required:false, defaultValue:'', note:'list element id' },
            { name:'text', type:'string', required:false, defaultValue:'', note:'list element text' }
        ];
        return attributes;
    },
    
    render: function() {
        // set content display
        var iconContent = '';
        if (this.state.iconClass) {
            this.state.iconClassNames = [
                this.state.iconClass,
                'listelement-icon'
            ];
            iconContent =
                <span className="listelement-icon-container">
                    <i className={ this.state.iconClassNames.join(' ') }></i>
                </span>;
        }
        var content =
            <div className="listelement-content-container" >
                { iconContent }
                <span className="listelement-text-container">
                    { this.state.text }
                </span>
            </div>;
        return (
            <div className={ this.state.containerClassNames.join(' ') }
                data-id={ this.state.id } >
                { content }
            </div>
        );
    }
});

