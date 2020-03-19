class Container {
    constructor(columns=4) {
      this.columns = columns;
      this.rows = [[]];
      this.index = 0;
      
    }

    get freePos() {
      const span = this.rows[this.index].reduce((prev, current) => {
        return prev + current.colspan
      }, 0)
      return this.columns - span;
    }
  
    addWidget(widget) {
      if (widget.colspan <= this.freePos) {
        this.rows[this.index].push(widget);
      } else {
        this.rows.push([]);
        this.index++;
        this.addWidget(widget);
      }
    }
  }

export default Container;
