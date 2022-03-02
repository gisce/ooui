class DashboardItem {
  _action_id: string | null = null;
  get action_id(): string | null {
    return this._action_id;
  }

  _position: string | null = null;
  get position(): string | null {
    return this._position;
  }

  constructor(attributes: any) {
    if (attributes.action_id) {
      this._action_id = attributes.action_id;
    }

    if (attributes.position) {
      this._position = attributes.position;
    }
  }
}

export default DashboardItem;
