// node_modules/kysely/dist/esm/util/object-utils.js
function isUndefined(obj) {
  return typeof obj === "undefined" || obj === void 0;
}
function isString(obj) {
  return typeof obj === "string";
}
function isNumber(obj) {
  return typeof obj === "number";
}
function isBoolean(obj) {
  return typeof obj === "boolean";
}
function isNull(obj) {
  return obj === null;
}
function isDate(obj) {
  return obj instanceof Date;
}
function isBigInt(obj) {
  return typeof obj === "bigint";
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function freeze(obj) {
  return Object.freeze(obj);
}
function asArray(arg) {
  if (isReadonlyArray(arg)) {
    return arg;
  } else {
    return [arg];
  }
}
function isReadonlyArray(arg) {
  return Array.isArray(arg);
}
function noop(obj) {
  return obj;
}

// node_modules/kysely/dist/esm/operation-node/alter-table-node.js
var AlterTableNode = freeze({
  is(node) {
    return node.kind === "AlterTableNode";
  },
  create(table) {
    return freeze({
      kind: "AlterTableNode",
      table
    });
  },
  cloneWithTableProps(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumnAlteration(node, columnAlteration) {
    return freeze({
      ...node,
      columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/identifier-node.js
var IdentifierNode = freeze({
  is(node) {
    return node.kind === "IdentifierNode";
  },
  create(name) {
    return freeze({
      kind: "IdentifierNode",
      name
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-index-node.js
var CreateIndexNode = freeze({
  is(node) {
    return node.kind === "CreateIndexNode";
  },
  create(name) {
    return freeze({
      kind: "CreateIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-schema-node.js
var CreateSchemaNode = freeze({
  is(node) {
    return node.kind === "CreateSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "CreateSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(createSchema, params) {
    return freeze({
      ...createSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-table-node.js
var ON_COMMIT_ACTIONS = ["preserve rows", "delete rows", "drop"];
var CreateTableNode = freeze({
  is(node) {
    return node.kind === "CreateTableNode";
  },
  create(table) {
    return freeze({
      kind: "CreateTableNode",
      table,
      columns: freeze([])
    });
  },
  cloneWithColumn(createTable, column) {
    return freeze({
      ...createTable,
      columns: freeze([...createTable.columns, column])
    });
  },
  cloneWithConstraint(createTable, constraint) {
    return freeze({
      ...createTable,
      constraints: createTable.constraints ? freeze([...createTable.constraints, constraint]) : freeze([constraint])
    });
  },
  cloneWithFrontModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      frontModifiers: createTable.frontModifiers ? freeze([...createTable.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithEndModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      endModifiers: createTable.endModifiers ? freeze([...createTable.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWith(createTable, params) {
    return freeze({
      ...createTable,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/schemable-identifier-node.js
var SchemableIdentifierNode = freeze({
  is(node) {
    return node.kind === "SchemableIdentifierNode";
  },
  create(identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      identifier: IdentifierNode.create(identifier)
    });
  },
  createWithSchema(schema, identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      schema: IdentifierNode.create(schema),
      identifier: IdentifierNode.create(identifier)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-index-node.js
var DropIndexNode = freeze({
  is(node) {
    return node.kind === "DropIndexNode";
  },
  create(name, params) {
    return freeze({
      kind: "DropIndexNode",
      name: SchemableIdentifierNode.create(name),
      ...params
    });
  },
  cloneWith(dropIndex, props) {
    return freeze({
      ...dropIndex,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-schema-node.js
var DropSchemaNode = freeze({
  is(node) {
    return node.kind === "DropSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "DropSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(dropSchema, params) {
    return freeze({
      ...dropSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-table-node.js
var DropTableNode = freeze({
  is(node) {
    return node.kind === "DropTableNode";
  },
  create(table, params) {
    return freeze({
      kind: "DropTableNode",
      table,
      ...params
    });
  },
  cloneWith(dropIndex, params) {
    return freeze({
      ...dropIndex,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/alias-node.js
var AliasNode = freeze({
  is(node) {
    return node.kind === "AliasNode";
  },
  create(node, alias) {
    return freeze({
      kind: "AliasNode",
      node,
      alias
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/table-node.js
var TableNode = freeze({
  is(node) {
    return node.kind === "TableNode";
  },
  create(table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.create(table)
    });
  },
  createWithSchema(schema, table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.createWithSchema(schema, table)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/operation-node-source.js
function isOperationNodeSource(obj) {
  return isObject(obj) && isFunction(obj.toOperationNode);
}

// node_modules/kysely/dist/esm/expression/expression.js
function isExpression(obj) {
  return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
  return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
}

// node_modules/kysely/dist/esm/operation-node/select-modifier-node.js
var SelectModifierNode = freeze({
  is(node) {
    return node.kind === "SelectModifierNode";
  },
  create(modifier, of) {
    return freeze({
      kind: "SelectModifierNode",
      modifier,
      of
    });
  },
  createWithExpression(modifier) {
    return freeze({
      kind: "SelectModifierNode",
      rawModifier: modifier
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/and-node.js
var AndNode = freeze({
  is(node) {
    return node.kind === "AndNode";
  },
  create(left, right) {
    return freeze({
      kind: "AndNode",
      left,
      right
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/or-node.js
var OrNode = freeze({
  is(node) {
    return node.kind === "OrNode";
  },
  create(left, right) {
    return freeze({
      kind: "OrNode",
      left,
      right
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/on-node.js
var OnNode = freeze({
  is(node) {
    return node.kind === "OnNode";
  },
  create(filter) {
    return freeze({
      kind: "OnNode",
      on: filter
    });
  },
  cloneWithOperation(onNode, operator, operation) {
    return freeze({
      ...onNode,
      on: operator === "And" ? AndNode.create(onNode.on, operation) : OrNode.create(onNode.on, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/join-node.js
var JoinNode = freeze({
  is(node) {
    return node.kind === "JoinNode";
  },
  create(joinType, table) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: void 0
    });
  },
  createWithOn(joinType, table, on) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: OnNode.create(on)
    });
  },
  cloneWithOn(joinNode, operation) {
    return freeze({
      ...joinNode,
      on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "And", operation) : OnNode.create(operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/binary-operation-node.js
var BinaryOperationNode = freeze({
  is(node) {
    return node.kind === "BinaryOperationNode";
  },
  create(leftOperand, operator, rightOperand) {
    return freeze({
      kind: "BinaryOperationNode",
      leftOperand,
      operator,
      rightOperand
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/operator-node.js
var COMPARISON_OPERATORS = [
  "=",
  "==",
  "!=",
  "<>",
  ">",
  ">=",
  "<",
  "<=",
  "in",
  "not in",
  "is",
  "is not",
  "like",
  "not like",
  "match",
  "ilike",
  "not ilike",
  "@>",
  "<@",
  "^@",
  "&&",
  "?",
  "?&",
  "?|",
  "!<",
  "!>",
  "<=>",
  "!~",
  "~",
  "~*",
  "!~*",
  "@@",
  "@@@",
  "!!",
  "<->",
  "regexp",
  "is distinct from",
  "is not distinct from"
];
var ARITHMETIC_OPERATORS = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "&",
  "|",
  "#",
  "<<",
  ">>"
];
var JSON_OPERATORS = ["->", "->>"];
var BINARY_OPERATORS = [
  ...COMPARISON_OPERATORS,
  ...ARITHMETIC_OPERATORS,
  "&&",
  "||"
];
var UNARY_FILTER_OPERATORS = ["exists", "not exists"];
var UNARY_OPERATORS = ["not", "-", ...UNARY_FILTER_OPERATORS];
var OPERATORS = [
  ...BINARY_OPERATORS,
  ...JSON_OPERATORS,
  ...UNARY_OPERATORS,
  "between",
  "between symmetric"
];
var OperatorNode = freeze({
  is(node) {
    return node.kind === "OperatorNode";
  },
  create(operator) {
    return freeze({
      kind: "OperatorNode",
      operator
    });
  }
});
function isJSONOperator(op) {
  return isString(op) && JSON_OPERATORS.includes(op);
}

// node_modules/kysely/dist/esm/operation-node/column-node.js
var ColumnNode = freeze({
  is(node) {
    return node.kind === "ColumnNode";
  },
  create(column) {
    return freeze({
      kind: "ColumnNode",
      column: IdentifierNode.create(column)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/select-all-node.js
var SelectAllNode = freeze({
  is(node) {
    return node.kind === "SelectAllNode";
  },
  create() {
    return freeze({
      kind: "SelectAllNode"
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/reference-node.js
var ReferenceNode = freeze({
  is(node) {
    return node.kind === "ReferenceNode";
  },
  create(column, table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column
    });
  },
  createSelectAll(table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column: SelectAllNode.create()
    });
  }
});

// node_modules/kysely/dist/esm/dynamic/dynamic-reference-builder.js
var DynamicReferenceBuilder = class {
  #dynamicReference;
  get dynamicReference() {
    return this.#dynamicReference;
  }
  /**
   * @private
   *
   * This needs to be here just so that the typings work. Without this
   * the generated .d.ts file contains no reference to the type param R
   * which causes this type to be equal to DynamicReferenceBuilder with
   * any R.
   */
  get refType() {
    return void 0;
  }
  constructor(reference) {
    this.#dynamicReference = reference;
  }
  toOperationNode() {
    return parseSimpleReferenceExpression(this.#dynamicReference);
  }
};
function isDynamicReferenceBuilder(obj) {
  return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}

// node_modules/kysely/dist/esm/operation-node/order-by-item-node.js
var OrderByItemNode = freeze({
  is(node) {
    return node.kind === "OrderByItemNode";
  },
  create(orderBy, direction) {
    return freeze({
      kind: "OrderByItemNode",
      orderBy,
      direction
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/raw-node.js
var RawNode = freeze({
  is(node) {
    return node.kind === "RawNode";
  },
  create(sqlFragments, parameters) {
    return freeze({
      kind: "RawNode",
      sqlFragments: freeze(sqlFragments),
      parameters: freeze(parameters)
    });
  },
  createWithSql(sql2) {
    return RawNode.create([sql2], []);
  },
  createWithChild(child) {
    return RawNode.create(["", ""], [child]);
  },
  createWithChildren(children) {
    return RawNode.create(new Array(children.length + 1).fill(""), children);
  }
});

// node_modules/kysely/dist/esm/operation-node/collate-node.js
var CollateNode = {
  is(node) {
    return node.kind === "CollateNode";
  },
  create(collation) {
    return freeze({
      kind: "CollateNode",
      collation: IdentifierNode.create(collation)
    });
  }
};

// node_modules/kysely/dist/esm/query-builder/order-by-item-builder.js
var OrderByItemBuilder = class _OrderByItemBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds `desc` to the `order by` item.
   *
   * See {@link asc} for the opposite.
   */
  desc() {
    return new _OrderByItemBuilder({
      node: OrderByItemNode.cloneWith(this.#props.node, {
        direction: RawNode.createWithSql("desc")
      })
    });
  }
  /**
   * Adds `asc` to the `order by` item.
   *
   * See {@link desc} for the opposite.
   */
  asc() {
    return new _OrderByItemBuilder({
      node: OrderByItemNode.cloneWith(this.#props.node, {
        direction: RawNode.createWithSql("asc")
      })
    });
  }
  /**
   * Adds `nulls last` to the `order by` item.
   *
   * This is only supported by some dialects like PostgreSQL and SQLite.
   *
   * See {@link nullsFirst} for the opposite.
   */
  nullsLast() {
    return new _OrderByItemBuilder({
      node: OrderByItemNode.cloneWith(this.#props.node, { nulls: "last" })
    });
  }
  /**
   * Adds `nulls first` to the `order by` item.
   *
   * This is only supported by some dialects like PostgreSQL and SQLite.
   *
   * See {@link nullsLast} for the opposite.
   */
  nullsFirst() {
    return new _OrderByItemBuilder({
      node: OrderByItemNode.cloneWith(this.#props.node, { nulls: "first" })
    });
  }
  /**
   * Adds `collate <collationName>` to the `order by` item.
   */
  collate(collation) {
    return new _OrderByItemBuilder({
      node: OrderByItemNode.cloneWith(this.#props.node, {
        collation: CollateNode.create(collation)
      })
    });
  }
  toOperationNode() {
    return this.#props.node;
  }
};

// node_modules/kysely/dist/esm/util/log-once.js
var LOGGED_MESSAGES = /* @__PURE__ */ new Set();
function logOnce(message) {
  if (LOGGED_MESSAGES.has(message)) {
    return;
  }
  LOGGED_MESSAGES.add(message);
  console.log(message);
}

// node_modules/kysely/dist/esm/parser/order-by-parser.js
function isOrderByDirection(thing) {
  return thing === "asc" || thing === "desc";
}
function parseOrderBy(args) {
  if (args.length === 2) {
    return [parseOrderByItem(args[0], args[1])];
  }
  if (args.length === 1) {
    const [orderBy] = args;
    if (Array.isArray(orderBy)) {
      logOnce("orderBy(array) is deprecated, use multiple orderBy calls instead.");
      return orderBy.map((item) => parseOrderByItem(item));
    }
    return [parseOrderByItem(orderBy)];
  }
  throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(expr, modifiers) {
  const parsedRef = parseOrderByExpression(expr);
  if (OrderByItemNode.is(parsedRef)) {
    if (modifiers) {
      throw new Error("Cannot specify direction twice!");
    }
    return parsedRef;
  }
  return parseOrderByWithModifiers(parsedRef, modifiers);
}
function parseOrderByExpression(expr) {
  if (isExpressionOrFactory(expr)) {
    return parseExpression(expr);
  }
  if (isDynamicReferenceBuilder(expr)) {
    return expr.toOperationNode();
  }
  const [ref, direction] = expr.split(" ");
  if (direction) {
    logOnce("`orderBy('column asc')` is deprecated. Use `orderBy('column', 'asc')` instead.");
    return parseOrderByWithModifiers(parseStringReference(ref), direction);
  }
  return parseStringReference(expr);
}
function parseOrderByWithModifiers(expr, modifiers) {
  if (typeof modifiers === "string") {
    if (!isOrderByDirection(modifiers)) {
      throw new Error(`Invalid order by direction: ${modifiers}`);
    }
    return OrderByItemNode.create(expr, RawNode.createWithSql(modifiers));
  }
  if (isExpression(modifiers)) {
    logOnce("`orderBy(..., expr)` is deprecated. Use `orderBy(..., 'asc')` or `orderBy(..., (ob) => ...)` instead.");
    return OrderByItemNode.create(expr, modifiers.toOperationNode());
  }
  const node = OrderByItemNode.create(expr);
  if (!modifiers) {
    return node;
  }
  return modifiers(new OrderByItemBuilder({ node })).toOperationNode();
}

// node_modules/kysely/dist/esm/operation-node/json-reference-node.js
var JSONReferenceNode = freeze({
  is(node) {
    return node.kind === "JSONReferenceNode";
  },
  create(reference, traversal) {
    return freeze({
      kind: "JSONReferenceNode",
      reference,
      traversal
    });
  },
  cloneWithTraversal(node, traversal) {
    return freeze({
      ...node,
      traversal
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/json-operator-chain-node.js
var JSONOperatorChainNode = freeze({
  is(node) {
    return node.kind === "JSONOperatorChainNode";
  },
  create(operator) {
    return freeze({
      kind: "JSONOperatorChainNode",
      operator,
      values: freeze([])
    });
  },
  cloneWithValue(node, value) {
    return freeze({
      ...node,
      values: freeze([...node.values, value])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/json-path-node.js
var JSONPathNode = freeze({
  is(node) {
    return node.kind === "JSONPathNode";
  },
  create(inOperator) {
    return freeze({
      kind: "JSONPathNode",
      inOperator,
      pathLegs: freeze([])
    });
  },
  cloneWithLeg(jsonPathNode, pathLeg) {
    return freeze({
      ...jsonPathNode,
      pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg])
    });
  }
});

// node_modules/kysely/dist/esm/parser/reference-parser.js
function parseSimpleReferenceExpression(exp) {
  if (isString(exp)) {
    return parseStringReference(exp);
  }
  return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return arg.map((it) => parseReferenceExpression(it));
  } else {
    return [parseReferenceExpression(arg)];
  }
}
function parseReferenceExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
  const referenceNode = parseStringReference(ref);
  if (isJSONOperator(op)) {
    return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
  }
  const opWithoutLastChar = op.slice(0, -1);
  if (isJSONOperator(opWithoutLastChar)) {
    return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
  }
  throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
  const COLUMN_SEPARATOR = ".";
  if (!ref.includes(COLUMN_SEPARATOR)) {
    return ReferenceNode.create(ColumnNode.create(ref));
  }
  const parts = ref.split(COLUMN_SEPARATOR).map(trim);
  if (parts.length === 3) {
    return parseStringReferenceWithTableAndSchema(parts);
  }
  if (parts.length === 2) {
    return parseStringReferenceWithTable(parts);
  }
  throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
  const ALIAS_SEPARATOR = " as ";
  if (ref.includes(ALIAS_SEPARATOR)) {
    const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim);
    return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
  } else {
    return parseStringReference(ref);
  }
}
function parseColumnName(column) {
  return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
  const ORDER_SEPARATOR = " ";
  if (column.includes(ORDER_SEPARATOR)) {
    const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim);
    if (!isOrderByDirection(order)) {
      throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
    }
    return parseOrderBy([columnName, order])[0];
  } else {
    return parseColumnName(column);
  }
}
function parseStringReferenceWithTableAndSchema(parts) {
  const [schema, table, column] = parts;
  return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
  const [table, column] = parts;
  return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/operation-node/primitive-value-list-node.js
var PrimitiveValueListNode = freeze({
  is(node) {
    return node.kind === "PrimitiveValueListNode";
  },
  create(values) {
    return freeze({
      kind: "PrimitiveValueListNode",
      values: freeze([...values])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/value-list-node.js
var ValueListNode = freeze({
  is(node) {
    return node.kind === "ValueListNode";
  },
  create(values) {
    return freeze({
      kind: "ValueListNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/value-node.js
var ValueNode = freeze({
  is(node) {
    return node.kind === "ValueNode";
  },
  create(value) {
    return freeze({
      kind: "ValueNode",
      value
    });
  },
  createImmediate(value) {
    return freeze({
      kind: "ValueNode",
      value,
      immediate: true
    });
  }
});

// node_modules/kysely/dist/esm/parser/value-parser.js
function parseValueExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return parseValueExpressionList(arg);
  }
  return parseValueExpression(arg);
}
function parseValueExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
  return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
  if (!isSafeImmediateValue(value)) {
    throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
  }
  return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
  if (arg.some(isExpressionOrFactory)) {
    return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(arg);
}

// node_modules/kysely/dist/esm/operation-node/parens-node.js
var ParensNode = freeze({
  is(node) {
    return node.kind === "ParensNode";
  },
  create(node) {
    return freeze({
      kind: "ParensNode",
      node
    });
  }
});

// node_modules/kysely/dist/esm/parser/binary-operation-parser.js
function parseValueBinaryOperationOrExpression(args) {
  if (args.length === 3) {
    return parseValueBinaryOperation(args[0], args[1], args[2]);
  } else if (args.length === 1) {
    return parseValueExpression(args[0]);
  }
  throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
  if (isIsOperator(operator) && needsIsOperator(right)) {
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
  }
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
  return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
  const combine = combinator === "and" ? AndNode.create : OrNode.create;
  if (list.length === 0) {
    return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create("="), ValueNode.createImmediate(combinator === "and" ? 1 : 0));
  }
  let node = toOperationNode(list[0]);
  for (let i = 1; i < list.length; ++i) {
    node = combine(node, toOperationNode(list[i]));
  }
  if (list.length > 1 && withParens) {
    return ParensNode.create(node);
  }
  return node;
}
function isIsOperator(operator) {
  return operator === "is" || operator === "is not";
}
function needsIsOperator(value) {
  return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
  if (isString(operator) && OPERATORS.includes(operator)) {
    return OperatorNode.create(operator);
  }
  if (isOperationNodeSource(operator)) {
    return operator.toOperationNode();
  }
  throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
  return isOperationNodeSource(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
}

// node_modules/kysely/dist/esm/operation-node/order-by-node.js
var OrderByNode = freeze({
  is(node) {
    return node.kind === "OrderByNode";
  },
  create(items) {
    return freeze({
      kind: "OrderByNode",
      items: freeze([...items])
    });
  },
  cloneWithItems(orderBy, items) {
    return freeze({
      ...orderBy,
      items: freeze([...orderBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/partition-by-node.js
var PartitionByNode = freeze({
  is(node) {
    return node.kind === "PartitionByNode";
  },
  create(items) {
    return freeze({
      kind: "PartitionByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(partitionBy, items) {
    return freeze({
      ...partitionBy,
      items: freeze([...partitionBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/over-node.js
var OverNode = freeze({
  is(node) {
    return node.kind === "OverNode";
  },
  create() {
    return freeze({
      kind: "OverNode"
    });
  },
  cloneWithOrderByItems(overNode, items) {
    return freeze({
      ...overNode,
      orderBy: overNode.orderBy ? OrderByNode.cloneWithItems(overNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithPartitionByItems(overNode, items) {
    return freeze({
      ...overNode,
      partitionBy: overNode.partitionBy ? PartitionByNode.cloneWithItems(overNode.partitionBy, items) : PartitionByNode.create(items)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/from-node.js
var FromNode = freeze({
  is(node) {
    return node.kind === "FromNode";
  },
  create(froms) {
    return freeze({
      kind: "FromNode",
      froms: freeze(froms)
    });
  },
  cloneWithFroms(from, froms) {
    return freeze({
      ...from,
      froms: freeze([...from.froms, ...froms])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/group-by-node.js
var GroupByNode = freeze({
  is(node) {
    return node.kind === "GroupByNode";
  },
  create(items) {
    return freeze({
      kind: "GroupByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(groupBy, items) {
    return freeze({
      ...groupBy,
      items: freeze([...groupBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/having-node.js
var HavingNode = freeze({
  is(node) {
    return node.kind === "HavingNode";
  },
  create(filter) {
    return freeze({
      kind: "HavingNode",
      having: filter
    });
  },
  cloneWithOperation(havingNode, operator, operation) {
    return freeze({
      ...havingNode,
      having: operator === "And" ? AndNode.create(havingNode.having, operation) : OrNode.create(havingNode.having, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/insert-query-node.js
var InsertQueryNode = freeze({
  is(node) {
    return node.kind === "InsertQueryNode";
  },
  create(into, withNode, replace) {
    return freeze({
      kind: "InsertQueryNode",
      into,
      ...withNode && { with: withNode },
      replace
    });
  },
  createWithoutInto() {
    return freeze({
      kind: "InsertQueryNode"
    });
  },
  cloneWith(insertQuery, props) {
    return freeze({
      ...insertQuery,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/list-node.js
var ListNode = freeze({
  is(node) {
    return node.kind === "ListNode";
  },
  create(items) {
    return freeze({
      kind: "ListNode",
      items: freeze(items)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/update-query-node.js
var UpdateQueryNode = freeze({
  is(node) {
    return node.kind === "UpdateQueryNode";
  },
  create(tables, withNode) {
    return freeze({
      kind: "UpdateQueryNode",
      // For backwards compatibility, use the raw table node when there's only one table
      // and don't rename the property to something like `tables`.
      table: tables.length === 1 ? tables[0] : ListNode.create(tables),
      ...withNode && { with: withNode }
    });
  },
  createWithoutTable() {
    return freeze({
      kind: "UpdateQueryNode"
    });
  },
  cloneWithFromItems(updateQuery, fromItems) {
    return freeze({
      ...updateQuery,
      from: updateQuery.from ? FromNode.cloneWithFroms(updateQuery.from, fromItems) : FromNode.create(fromItems)
    });
  },
  cloneWithUpdates(updateQuery, updates) {
    return freeze({
      ...updateQuery,
      updates: updateQuery.updates ? freeze([...updateQuery.updates, ...updates]) : updates
    });
  },
  cloneWithLimit(updateQuery, limit) {
    return freeze({
      ...updateQuery,
      limit
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/using-node.js
var UsingNode = freeze({
  is(node) {
    return node.kind === "UsingNode";
  },
  create(tables) {
    return freeze({
      kind: "UsingNode",
      tables: freeze(tables)
    });
  },
  cloneWithTables(using, tables) {
    return freeze({
      ...using,
      tables: freeze([...using.tables, ...tables])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/delete-query-node.js
var DeleteQueryNode = freeze({
  is(node) {
    return node.kind === "DeleteQueryNode";
  },
  create(fromItems, withNode) {
    return freeze({
      kind: "DeleteQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  // TODO: remove in v0.29
  /**
   * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
   */
  cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
  // TODO: remove in v0.29
  /**
   * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
   */
  cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
  cloneWithLimit(deleteNode, limit) {
    return freeze({
      ...deleteNode,
      limit
    });
  },
  cloneWithoutLimit(deleteNode) {
    return freeze({
      ...deleteNode,
      limit: void 0
    });
  },
  cloneWithUsing(deleteNode, tables) {
    return freeze({
      ...deleteNode,
      using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/where-node.js
var WhereNode = freeze({
  is(node) {
    return node.kind === "WhereNode";
  },
  create(filter) {
    return freeze({
      kind: "WhereNode",
      where: filter
    });
  },
  cloneWithOperation(whereNode, operator, operation) {
    return freeze({
      ...whereNode,
      where: operator === "And" ? AndNode.create(whereNode.where, operation) : OrNode.create(whereNode.where, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/returning-node.js
var ReturningNode = freeze({
  is(node) {
    return node.kind === "ReturningNode";
  },
  create(selections) {
    return freeze({
      kind: "ReturningNode",
      selections: freeze(selections)
    });
  },
  cloneWithSelections(returning, selections) {
    return freeze({
      ...returning,
      selections: returning.selections ? freeze([...returning.selections, ...selections]) : freeze(selections)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/explain-node.js
var ExplainNode = freeze({
  is(node) {
    return node.kind === "ExplainNode";
  },
  create(format, options) {
    return freeze({
      kind: "ExplainNode",
      format,
      options
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/when-node.js
var WhenNode = freeze({
  is(node) {
    return node.kind === "WhenNode";
  },
  create(condition) {
    return freeze({
      kind: "WhenNode",
      condition
    });
  },
  cloneWithResult(whenNode, result) {
    return freeze({
      ...whenNode,
      result
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/merge-query-node.js
var MergeQueryNode = freeze({
  is(node) {
    return node.kind === "MergeQueryNode";
  },
  create(into, withNode) {
    return freeze({
      kind: "MergeQueryNode",
      into,
      ...withNode && { with: withNode }
    });
  },
  cloneWithUsing(mergeNode, using) {
    return freeze({
      ...mergeNode,
      using
    });
  },
  cloneWithWhen(mergeNode, when) {
    return freeze({
      ...mergeNode,
      whens: mergeNode.whens ? freeze([...mergeNode.whens, when]) : freeze([when])
    });
  },
  cloneWithThen(mergeNode, then) {
    return freeze({
      ...mergeNode,
      whens: mergeNode.whens ? freeze([
        ...mergeNode.whens.slice(0, -1),
        WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then)
      ]) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/output-node.js
var OutputNode = freeze({
  is(node) {
    return node.kind === "OutputNode";
  },
  create(selections) {
    return freeze({
      kind: "OutputNode",
      selections: freeze(selections)
    });
  },
  cloneWithSelections(output, selections) {
    return freeze({
      ...output,
      selections: output.selections ? freeze([...output.selections, ...selections]) : freeze(selections)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/query-node.js
var QueryNode = freeze({
  is(node) {
    return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node) || MergeQueryNode.is(node);
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithWhere(node, operation) {
    return freeze({
      ...node,
      where: node.where ? WhereNode.cloneWithOperation(node.where, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithJoin(node, join) {
    return freeze({
      ...node,
      joins: node.joins ? freeze([...node.joins, join]) : freeze([join])
    });
  },
  cloneWithReturning(node, selections) {
    return freeze({
      ...node,
      returning: node.returning ? ReturningNode.cloneWithSelections(node.returning, selections) : ReturningNode.create(selections)
    });
  },
  cloneWithoutReturning(node) {
    return freeze({
      ...node,
      returning: void 0
    });
  },
  cloneWithoutWhere(node) {
    return freeze({
      ...node,
      where: void 0
    });
  },
  cloneWithExplain(node, format, options) {
    return freeze({
      ...node,
      explain: ExplainNode.create(format, options?.toOperationNode())
    });
  },
  cloneWithTop(node, top) {
    return freeze({
      ...node,
      top
    });
  },
  cloneWithOutput(node, selections) {
    return freeze({
      ...node,
      output: node.output ? OutputNode.cloneWithSelections(node.output, selections) : OutputNode.create(selections)
    });
  },
  cloneWithOrderByItems(node, items) {
    return freeze({
      ...node,
      orderBy: node.orderBy ? OrderByNode.cloneWithItems(node.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithoutOrderBy(node) {
    return freeze({
      ...node,
      orderBy: void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/select-query-node.js
var SelectQueryNode = freeze({
  is(node) {
    return node.kind === "SelectQueryNode";
  },
  create(withNode) {
    return freeze({
      kind: "SelectQueryNode",
      ...withNode && { with: withNode }
    });
  },
  createFrom(fromItems, withNode) {
    return freeze({
      kind: "SelectQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  cloneWithSelections(select, selections) {
    return freeze({
      ...select,
      selections: select.selections ? freeze([...select.selections, ...selections]) : freeze(selections)
    });
  },
  cloneWithDistinctOn(select, expressions) {
    return freeze({
      ...select,
      distinctOn: select.distinctOn ? freeze([...select.distinctOn, ...expressions]) : freeze(expressions)
    });
  },
  cloneWithFrontModifier(select, modifier) {
    return freeze({
      ...select,
      frontModifiers: select.frontModifiers ? freeze([...select.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  // TODO: remove in v0.29
  /**
   * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
   */
  cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
  cloneWithGroupByItems(selectNode, items) {
    return freeze({
      ...selectNode,
      groupBy: selectNode.groupBy ? GroupByNode.cloneWithItems(selectNode.groupBy, items) : GroupByNode.create(items)
    });
  },
  cloneWithLimit(selectNode, limit) {
    return freeze({
      ...selectNode,
      limit
    });
  },
  cloneWithOffset(selectNode, offset) {
    return freeze({
      ...selectNode,
      offset
    });
  },
  cloneWithFetch(selectNode, fetch2) {
    return freeze({
      ...selectNode,
      fetch: fetch2
    });
  },
  cloneWithHaving(selectNode, operation) {
    return freeze({
      ...selectNode,
      having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "And", operation) : HavingNode.create(operation)
    });
  },
  cloneWithSetOperations(selectNode, setOperations) {
    return freeze({
      ...selectNode,
      setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, ...setOperations]) : freeze([...setOperations])
    });
  },
  cloneWithoutSelections(select) {
    return freeze({
      ...select,
      selections: []
    });
  },
  cloneWithoutLimit(select) {
    return freeze({
      ...select,
      limit: void 0
    });
  },
  cloneWithoutOffset(select) {
    return freeze({
      ...select,
      offset: void 0
    });
  },
  // TODO: remove in v0.29
  /**
   * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
   */
  cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
  cloneWithoutGroupBy(select) {
    return freeze({
      ...select,
      groupBy: void 0
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/join-builder.js
var JoinBuilder = class _JoinBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  on(...args) {
    return new _JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Just like {@link WhereInterface.whereRef} but adds an item to the join's
   * `on` clause instead.
   *
   * See {@link WhereInterface.whereRef} for documentation and examples.
   */
  onRef(lhs, op, rhs) {
    return new _JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds `on true`.
   */
  onTrue() {
    return new _JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, RawNode.createWithSql("true"))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.joinNode;
  }
};

// node_modules/kysely/dist/esm/operation-node/partition-by-item-node.js
var PartitionByItemNode = freeze({
  is(node) {
    return node.kind === "PartitionByItemNode";
  },
  create(partitionBy) {
    return freeze({
      kind: "PartitionByItemNode",
      partitionBy
    });
  }
});

// node_modules/kysely/dist/esm/parser/partition-by-parser.js
function parsePartitionBy(partitionBy) {
  return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}

// node_modules/kysely/dist/esm/query-builder/over-builder.js
var OverBuilder = class _OverBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  orderBy(...args) {
    return new _OverBuilder({
      overNode: OverNode.cloneWithOrderByItems(this.#props.overNode, parseOrderBy(args))
    });
  }
  clearOrderBy() {
    return new _OverBuilder({
      overNode: QueryNode.cloneWithoutOrderBy(this.#props.overNode)
    });
  }
  partitionBy(partitionBy) {
    return new _OverBuilder({
      overNode: OverNode.cloneWithPartitionByItems(this.#props.overNode, parsePartitionBy(partitionBy))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.overNode;
  }
};

// node_modules/kysely/dist/esm/operation-node/selection-node.js
var SelectionNode = freeze({
  is(node) {
    return node.kind === "SelectionNode";
  },
  create(selection) {
    return freeze({
      kind: "SelectionNode",
      selection
    });
  },
  createSelectAll() {
    return freeze({
      kind: "SelectionNode",
      selection: SelectAllNode.create()
    });
  },
  createSelectAllFromTable(table) {
    return freeze({
      kind: "SelectionNode",
      selection: ReferenceNode.createSelectAll(table)
    });
  }
});

// node_modules/kysely/dist/esm/parser/select-parser.js
function parseSelectArg(selection) {
  if (isFunction(selection)) {
    return parseSelectArg(selection(expressionBuilder()));
  } else if (isReadonlyArray(selection)) {
    return selection.map((it) => parseSelectExpression(it));
  } else {
    return [parseSelectExpression(selection)];
  }
}
function parseSelectExpression(selection) {
  if (isString(selection)) {
    return SelectionNode.create(parseAliasedStringReference(selection));
  } else if (isDynamicReferenceBuilder(selection)) {
    return SelectionNode.create(selection.toOperationNode());
  } else {
    return SelectionNode.create(parseAliasedExpression(selection));
  }
}
function parseSelectAll(table) {
  if (!table) {
    return [SelectionNode.createSelectAll()];
  } else if (Array.isArray(table)) {
    return table.map(parseSelectAllArg);
  } else {
    return [parseSelectAllArg(table)];
  }
}
function parseSelectAllArg(table) {
  if (isString(table)) {
    return SelectionNode.createSelectAllFromTable(parseTable(table));
  }
  throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}

// node_modules/kysely/dist/esm/operation-node/values-node.js
var ValuesNode = freeze({
  is(node) {
    return node.kind === "ValuesNode";
  },
  create(values) {
    return freeze({
      kind: "ValuesNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/default-insert-value-node.js
var DefaultInsertValueNode = freeze({
  is(node) {
    return node.kind === "DefaultInsertValueNode";
  },
  create() {
    return freeze({
      kind: "DefaultInsertValueNode"
    });
  }
});

// node_modules/kysely/dist/esm/parser/insert-values-parser.js
function parseInsertExpression(arg) {
  const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
  const list = isReadonlyArray(objectOrList) ? objectOrList : freeze([objectOrList]);
  return parseInsertColumnsAndValues(list);
}
function parseInsertColumnsAndValues(rows) {
  const columns = parseColumnNamesAndIndexes(rows);
  return [
    freeze([...columns.keys()].map(ColumnNode.create)),
    ValuesNode.create(rows.map((row) => parseRowValues(row, columns)))
  ];
}
function parseColumnNamesAndIndexes(rows) {
  const columns = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const cols = Object.keys(row);
    for (const col of cols) {
      if (!columns.has(col) && row[col] !== void 0) {
        columns.set(col, columns.size);
      }
    }
  }
  return columns;
}
function parseRowValues(row, columns) {
  const rowColumns = Object.keys(row);
  const rowValues = Array.from({
    length: columns.size
  });
  let hasUndefinedOrComplexColumns = false;
  let indexedRowColumns = rowColumns.length;
  for (const col of rowColumns) {
    const columnIdx = columns.get(col);
    if (isUndefined(columnIdx)) {
      indexedRowColumns--;
      continue;
    }
    const value = row[col];
    if (isUndefined(value) || isExpressionOrFactory(value)) {
      hasUndefinedOrComplexColumns = true;
    }
    rowValues[columnIdx] = value;
  }
  const hasMissingColumns = indexedRowColumns < columns.size;
  if (hasMissingColumns || hasUndefinedOrComplexColumns) {
    const defaultValue = DefaultInsertValueNode.create();
    return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(rowValues);
}

// node_modules/kysely/dist/esm/operation-node/column-update-node.js
var ColumnUpdateNode = freeze({
  is(node) {
    return node.kind === "ColumnUpdateNode";
  },
  create(column, value) {
    return freeze({
      kind: "ColumnUpdateNode",
      column,
      value
    });
  }
});

// node_modules/kysely/dist/esm/parser/update-set-parser.js
function parseUpdate(...args) {
  if (args.length === 2) {
    return [
      ColumnUpdateNode.create(parseReferenceExpression(args[0]), parseValueExpression(args[1]))
    ];
  }
  return parseUpdateObjectExpression(args[0]);
}
function parseUpdateObjectExpression(update) {
  const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
  return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
    return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
  });
}

// node_modules/kysely/dist/esm/operation-node/on-duplicate-key-node.js
var OnDuplicateKeyNode = freeze({
  is(node) {
    return node.kind === "OnDuplicateKeyNode";
  },
  create(updates) {
    return freeze({
      kind: "OnDuplicateKeyNode",
      updates
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/insert-result.js
var InsertResult = class {
  /**
   * The auto incrementing primary key of the inserted row.
   *
   * This property can be undefined when the query contains an `on conflict`
   * clause that makes the query succeed even when nothing gets inserted.
   *
   * This property is always undefined on dialects like PostgreSQL that
   * don't return the inserted id by default. On those dialects you need
   * to use the {@link ReturningInterface.returning | returning} method.
   */
  insertId;
  /**
   * Affected rows count.
   */
  numInsertedOrUpdatedRows;
  constructor(insertId, numInsertedOrUpdatedRows) {
    this.insertId = insertId;
    this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
  }
};

// node_modules/kysely/dist/esm/query-builder/no-result-error.js
var NoResultError = class extends Error {
  /**
   * The operation node tree of the query that was executed.
   */
  node;
  constructor(node) {
    super("no result");
    this.node = node;
  }
};
function isNoResultErrorConstructor(fn) {
  return Object.prototype.hasOwnProperty.call(fn, "prototype");
}

// node_modules/kysely/dist/esm/operation-node/on-conflict-node.js
var OnConflictNode = freeze({
  is(node) {
    return node.kind === "OnConflictNode";
  },
  create() {
    return freeze({
      kind: "OnConflictNode"
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithIndexWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithIndexOrWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateOrWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithoutIndexWhere(node) {
    return freeze({
      ...node,
      indexWhere: void 0
    });
  },
  cloneWithoutUpdateWhere(node) {
    return freeze({
      ...node,
      updateWhere: void 0
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/on-conflict-builder.js
var OnConflictBuilder = class _OnConflictBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Specify a single column as the conflict target.
   *
   * Also see the {@link columns}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  column(column) {
    const columnNode = ColumnNode.create(column);
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        columns: this.#props.onConflictNode.columns ? freeze([...this.#props.onConflictNode.columns, columnNode]) : freeze([columnNode])
      })
    });
  }
  /**
   * Specify a list of columns as the conflict target.
   *
   * Also see the {@link column}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  columns(columns) {
    const columnNodes = columns.map(ColumnNode.create);
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        columns: this.#props.onConflictNode.columns ? freeze([...this.#props.onConflictNode.columns, ...columnNodes]) : freeze(columnNodes)
      })
    });
  }
  /**
   * Specify a specific constraint by name as the conflict target.
   *
   * Also see the {@link column}, {@link columns} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  constraint(constraintName) {
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        constraint: IdentifierNode.create(constraintName)
      })
    });
  }
  /**
   * Specify an expression as the conflict target.
   *
   * This can be used if the unique index is an expression index.
   *
   * Also see the {@link column}, {@link columns} and {@link constraint}
   * methods for alternative ways to specify the conflict target.
   */
  expression(expression) {
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        indexExpression: expression.toOperationNode()
      })
    });
  }
  where(...args) {
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode)
    });
  }
  /**
   * Adds the "do nothing" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * const id = 1
   * const first_name = 'John'
   *
   * await db
   *   .insertInto('person')
   *   .values({ first_name, id })
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doNothing()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "id")
   * values ($1, $2)
   * on conflict ("id") do nothing
   * ```
   */
  doNothing() {
    return new OnConflictDoNothingBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        doNothing: true
      })
    });
  }
  /**
   * Adds the "do update set" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * const id = 1
   * const first_name = 'John'
   *
   * await db
   *   .insertInto('person')
   *   .values({ first_name, id })
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doUpdateSet({ first_name })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "id")
   * values ($1, $2)
   * on conflict ("id")
   * do update set "first_name" = $3
   * ```
   *
   * In the next example we use the `ref` method to reference
   * columns of the virtual table `excluded` in a type-safe way
   * to create an upsert operation:
   *
   * ```ts
   * import type { NewPerson } from 'type-editor' // imaginary module
   *
   * async function upsertPerson(person: NewPerson): Promise<void> {
   *   await db.insertInto('person')
   *     .values(person)
   *     .onConflict((oc) => oc
   *       .column('id')
   *       .doUpdateSet((eb) => ({
   *         first_name: eb.ref('excluded.first_name'),
   *         last_name: eb.ref('excluded.last_name')
   *       })
   *     )
   *   )
   *   .execute()
   * }
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name")
   * values ($1, $2)
   * on conflict ("id")
   * do update set
   *  "first_name" = excluded."first_name",
   *  "last_name" = excluded."last_name"
   * ```
   */
  doUpdateSet(update) {
    return new OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        updates: parseUpdateObjectExpression(update)
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
var OnConflictDoNothingBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.onConflictNode;
  }
};
var OnConflictUpdateBuilder = class _OnConflictUpdateBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new _OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Specify a where condition for the update operation.
   *
   * See {@link WhereInterface.whereRef} for more info.
   */
  whereRef(lhs, op, rhs) {
    return new _OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.onConflictNode;
  }
};

// node_modules/kysely/dist/esm/operation-node/top-node.js
var TopNode = freeze({
  is(node) {
    return node.kind === "TopNode";
  },
  create(expression, modifiers) {
    return freeze({
      kind: "TopNode",
      expression,
      modifiers
    });
  }
});

// node_modules/kysely/dist/esm/parser/top-parser.js
function parseTop(expression, modifiers) {
  if (!isNumber(expression) && !isBigInt(expression)) {
    throw new Error(`Invalid top expression: ${expression}`);
  }
  if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) {
    throw new Error(`Invalid top modifiers: ${modifiers}`);
  }
  return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
  return modifiers === "percent" || modifiers === "with ties" || modifiers === "percent with ties";
}

// node_modules/kysely/dist/esm/operation-node/or-action-node.js
var OrActionNode = freeze({
  is(node) {
    return node.kind === "OrActionNode";
  },
  create(action) {
    return freeze({
      kind: "OrActionNode",
      action
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/insert-query-builder.js
var InsertQueryBuilder = class _InsertQueryBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
   *
   * This method takes an object whose keys are column names and values are
   * values to insert. In addition to the column's type, the values can be
   * raw {@link sql} snippets or select queries.
   *
   * You must provide all fields you haven't explicitly marked as nullable
   * or optional using {@link Generated} or {@link ColumnType}.
   *
   * The return value of an `insert` query is an instance of {@link InsertResult}. The
   * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
   * key if the database returned one.
   *
   * On PostgreSQL and some other dialects, you need to call `returning` to get
   * something out of the query.
   *
   * Also see the {@link expression} method for inserting the result of a select
   * query or any other expression.
   *
   * ### Examples
   *
   * <!-- siteExample("insert", "Single row", 10) -->
   *
   * Insert a single row:
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40
   *   })
   *   .executeTakeFirst()
   *
   * // `insertId` is only available on dialects that
   * // automatically return the id of the inserted row
   * // such as MySQL and SQLite. On PostgreSQL, for example,
   * // you need to add a `returning` clause to the query to
   * // get anything out. See the "returning data" example.
   * console.log(result.insertId)
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
   * ```
   *
   * <!-- siteExample("insert", "Multiple rows", 20) -->
   *
   * On dialects that support it (for example PostgreSQL) you can insert multiple
   * rows by providing an array. Note that the return value is once again very
   * dialect-specific. Some databases may only return the id of the *last* inserted
   * row and some return nothing at all unless you call `returning`.
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values([{
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40,
   *   }, {
   *     first_name: 'Arnold',
   *     last_name: 'Schwarzenegger',
   *     age: 70,
   *   }])
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
   * ```
   *
   * <!-- siteExample("insert", "Returning data", 30) -->
   *
   * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
   * the inserted row's columns (or any other expression) as the return value. `returning`
   * works just like `select`. Refer to `select` method's examples and documentation for
   * more info.
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40,
   *   })
   *   .returning(['id', 'first_name as name'])
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
   * ```
   *
   * <!-- siteExample("insert", "Complex values", 40) -->
   *
   * In addition to primitives, the values can also be arbitrary expressions.
   * You can build the expressions by using a callback and calling the methods
   * on the expression builder passed to it:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const ani = "Ani"
   * const ston = "ston"
   *
   * const result = await db
   *   .insertInto('person')
   *   .values(({ ref, selectFrom, fn }) => ({
   *     first_name: 'Jennifer',
   *     last_name: sql<string>`concat(${ani}, ${ston})`,
   *     middle_name: ref('first_name'),
   *     age: selectFrom('person')
   *       .select(fn.avg<number>('age').as('avg_age')),
   *   }))
   *   .executeTakeFirst()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" (
   *   "first_name",
   *   "last_name",
   *   "middle_name",
   *   "age"
   * )
   * values (
   *   $1,
   *   concat($2, $3),
   *   "first_name",
   *   (select avg("age") as "avg_age" from "person")
   * )
   * ```
   *
   * You can also use the callback version of subqueries or raw expressions:
   *
   * ```ts
   * await db.with('jennifer', (db) => db
   *   .selectFrom('person')
   *   .where('first_name', '=', 'Jennifer')
   *   .select(['id', 'first_name', 'gender'])
   *   .limit(1)
   * ).insertInto('pet').values((eb) => ({
   *   owner_id: eb.selectFrom('jennifer').select('id'),
   *   name: eb.selectFrom('jennifer').select('first_name'),
   *   species: 'cat',
   * }))
   * .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * with "jennifer" as (
   *   select "id", "first_name", "gender"
   *   from "person"
   *   where "first_name" = $1
   *   limit $2
   * )
   * insert into "pet" ("owner_id", "name", "species")
   * values (
   *  (select "id" from "jennifer"),
   *  (select "first_name" from "jennifer"),
   *  $3
   * )
   * ```
   */
  values(insert) {
    const [columns, values] = parseInsertExpression(insert);
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        columns,
        values
      })
    });
  }
  /**
   * Sets the columns to insert.
   *
   * The {@link values} method sets both the columns and the values and this method
   * is not needed. But if you are using the {@link expression} method, you can use
   * this method to set the columns to insert.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .columns(['first_name'])
   *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name")
   * select "pet"."name" from "pet"
   * ```
   */
  columns(columns) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        columns: freeze(columns.map(ColumnNode.create))
      })
    });
  }
  /**
   * Insert an arbitrary expression. For example the result of a select query.
   *
   * ### Examples
   *
   * <!-- siteExample("insert", "Insert subquery", 50) -->
   *
   * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
   * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
   * remember. The reasons for this design stem from implementation difficulties.
   *
   * ```ts
   * const result = await db.insertInto('person')
   *   .columns(['first_name', 'last_name', 'age'])
   *   .expression((eb) => eb
   *     .selectFrom('pet')
   *     .select((eb) => [
   *       'pet.name',
   *       eb.val('Petson').as('last_name'),
   *       eb.lit(7).as('age'),
   *     ])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age")
   * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
   * ```
   */
  expression(expression) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        values: parseExpression(expression)
      })
    });
  }
  /**
   * Creates an `insert into "person" default values` query.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .defaultValues()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" default values
   * ```
   */
  defaultValues() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        defaultValues: true
      })
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .modifyEnd(sql`-- This is a comment`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` ("first_name", "last_name", "gender")
   * values (?, ?, ?) -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Changes an `insert into` query to an `insert ignore into` query.
   *
   * This is only supported by some dialects like MySQL.
   *
   * To avoid a footgun, when invoked with the SQLite dialect, this method will
   * be handled like {@link orIgnore}. See also, {@link orAbort}, {@link orFail},
   * {@link orReplace}, and {@link orRollback}.
   *
   * If you use the ignore modifier, ignorable errors that occur while executing the
   * insert statement are ignored. For example, without ignore, a row that duplicates
   * an existing unique index or primary key value in the table causes a duplicate-key
   * error and the statement is aborted. With ignore, the row is discarded and no error
   * occurs.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .ignore()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  ignore() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("ignore")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert or ignore into` query.
   *
   * This is only supported by some dialects like SQLite.
   *
   * To avoid a footgun, when invoked with the MySQL dialect, this method will
   * be handled like {@link ignore}.
   *
   * See also, {@link orAbort}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .orIgnore()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
   * ```
   */
  orIgnore() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("ignore")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert or abort into` query.
   *
   * This is only supported by some dialects like SQLite.
   *
   * See also, {@link orIgnore}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .orAbort()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or abort into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  orAbort() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("abort")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert or fail into` query.
   *
   * This is only supported by some dialects like SQLite.
   *
   * See also, {@link orIgnore}, {@link orAbort}, {@link orReplace}, and {@link orRollback}.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .orFail()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or fail into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  orFail() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("fail")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert or replace into` query.
   *
   * This is only supported by some dialects like SQLite.
   *
   * You can also use {@link Kysely.replaceInto} to achieve the same result.
   *
   * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orRollback}.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .orReplace()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or replace into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  orReplace() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("replace")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert or rollback into` query.
   *
   * This is only supported by some dialects like SQLite.
   *
   * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orReplace}.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .orRollback()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * insert or rollback into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  orRollback() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        orAction: OrActionNode.create("rollback")
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert top into` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Insert the first 5 rows:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .top(5)
   *   .columns(['first_name', 'gender'])
   *   .expression(
   *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
   * ```
   *
   * Insert the first 50 percent of rows:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .top(50, 'percent')
   *   .columns(['first_name', 'gender'])
   *   .expression(
   *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
   * ```
   */
  top(expression, modifiers) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  /**
   * Adds an `on conflict` clause to the query.
   *
   * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
   * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name")
   * do update set "species" = $4
   * ```
   *
   * You can provide the name of the constraint instead of a column name:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .constraint('pet_name_key')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict on constraint "pet_name_key"
   * do update set "species" = $4
   * ```
   *
   * You can also specify an expression as the conflict target in case
   * the unique index is an expression index:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .expression(sql<string>`lower(name)`)
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict (lower(name))
   * do update set "species" = $4
   * ```
   *
   * You can add a filter for the update statement like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *     .where('excluded.name', '!=', 'Catto')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name")
   * do update set "species" = $4
   * where "excluded"."name" != $5
   * ```
   *
   * You can create an `on conflict do nothing` clauses like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doNothing()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name") do nothing
   * ```
   *
   * You can refer to the columns of the virtual `excluded` table
   * in a type-safe way using a callback and the `ref` method of
   * `ExpressionBuilder`:
   *
   * ```ts
   * await db.insertInto('person')
   *   .values({
   *     id: 1,
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .onConflict(oc => oc
   *     .column('id')
   *     .doUpdateSet({
   *       first_name: (eb) => eb.ref('excluded.first_name'),
   *       last_name: (eb) => eb.ref('excluded.last_name')
   *     })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("id", "first_name", "last_name", "gender")
   * values ($1, $2, $3, $4)
   * on conflict ("id")
   * do update set
   *  "first_name" = "excluded"."first_name",
   *  "last_name" = "excluded"."last_name"
   * ```
   */
  onConflict(callback) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        onConflict: callback(new OnConflictBuilder({
          onConflictNode: OnConflictNode.create()
        })).toOperationNode()
      })
    });
  }
  /**
   * Adds `on duplicate key update` to the query.
   *
   * If you specify `on duplicate key update`, and a row is inserted that would cause
   * a duplicate value in a unique index or primary key, an update of the old row occurs.
   *
   * This is only implemented by some dialects like MySQL. On most dialects you should
   * use {@link onConflict} instead.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values({
   *     id: 1,
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
   * values (?, ?, ?, ?)
   * on duplicate key update `updated_at` = ?
   * ```
   */
  onDuplicateKeyUpdate(update) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateObjectExpression(update))
      })
    });
  }
  returning(selection) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll())
    });
  }
  output(args) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table))
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
   *   .returning(['first_name'])
   *   .clearReturning()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
   * ```
   */
  clearReturning() {
    return new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.insertInto('person')
   *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { NewPerson } from 'type-editor' // imaginary module
   *
   * async function insertPerson(values: NewPerson, returnLastName: boolean) {
   *   return await db
   *     .insertInto('person')
   *     .values(values)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `insertPerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _InsertQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `InsertQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _InsertQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link values} input
   * when using {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const person = await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *     nullable_column: 'hell yeah!'
   *   })
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const person = await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *     nullable_column: 'hell yeah!'
   *   })
   *   .returningAll()
   *   .$narrowType<{ nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _InsertQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
   *
   * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
   *   return await db
   *     .with('new_person', (qb) => qb
   *       .insertInto('person')
   *       .values(person)
   *       .returning('id')
   *       .$assertType<{ id: number }>()
   *     )
   *     .with('new_pet', (qb) => qb
   *       .insertInto('pet')
   *       .values((eb) => ({
   *         owner_id: eb.selectFrom('new_person').select('id'),
   *         ...pet
   *       }))
   *       .returning(['name as pet_name', 'species'])
   *       .$assertType<{ pet_name: string, species: Species }>()
   *     )
   *     .selectFrom(['new_person', 'new_pet'])
   *     .selectAll()
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   */
  $assertType() {
    return new _InsertQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _InsertQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery);
    const { adapter } = this.#props.executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [
      new InsertResult(result.insertId, result.numAffectedRows ?? BigInt(0))
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};

// node_modules/kysely/dist/esm/query-builder/delete-result.js
var DeleteResult = class {
  numDeletedRows;
  constructor(numDeletedRows) {
    this.numDeletedRows = numDeletedRows;
  }
};

// node_modules/kysely/dist/esm/operation-node/limit-node.js
var LimitNode = freeze({
  is(node) {
    return node.kind === "LimitNode";
  },
  create(limit) {
    return freeze({
      kind: "LimitNode",
      limit
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/delete-query-builder.js
var DeleteQueryBuilder = class _DeleteQueryBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  /**
   * Changes a `delete from` query into a `delete top from` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Delete the first 5 rows:
   *
   * ```ts
   * await db
   *   .deleteFrom('person')
   *   .top(5)
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * delete top(5) from "person" where "age" > @1
   * ```
   *
   * Delete the first 50% of rows:
   *
   * ```ts
   * await db
   *   .deleteFrom('person')
   *   .top(50, 'percent')
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * delete top(50) percent from "person" where "age" > @1
   * ```
   */
  top(expression, modifiers) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  using(tables) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithUsing(this.#props.queryNode, parseTableExpressionOrList(tables))
    });
  }
  innerJoin(...args) {
    return this.#join("InnerJoin", args);
  }
  leftJoin(...args) {
    return this.#join("LeftJoin", args);
  }
  rightJoin(...args) {
    return this.#join("RightJoin", args);
  }
  fullJoin(...args) {
    return this.#join("FullJoin", args);
  }
  #join(joinType, args) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args))
    });
  }
  returning(selection) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll(table) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table))
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.deleteFrom('pet')
   *   .returningAll()
   *   .where('name', '=', 'Max')
   *   .clearReturning()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * delete from "pet" where "name" = "Max"
   * ```
   */
  clearReturning() {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode)
    });
  }
  /**
   * Clears the `limit` clause from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.deleteFrom('pet')
   *   .returningAll()
   *   .where('name', '=', 'Max')
   *   .limit(5)
   *   .clearLimit()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * delete from "pet" where "name" = "Max" returning *
   * ```
   */
  clearLimit() {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithoutLimit(this.#props.queryNode)
    });
  }
  orderBy(...args) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args))
    });
  }
  clearOrderBy() {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode)
    });
  }
  /**
   * Adds a limit clause to the query.
   *
   * A limit clause in a delete query is only supported by some dialects
   * like MySQL.
   *
   * ### Examples
   *
   * Delete 5 oldest items in a table:
   *
   * ```ts
   * await db
   *   .deleteFrom('pet')
   *   .orderBy('created_at')
   *   .limit(5)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `pet` order by `created_at` limit ?
   * ```
   */
  limit(limit) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.deleteFrom('person')
   *   .where('first_name', '=', 'John')
   *   .modifyEnd(sql`-- This is a comment`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `person`
   * where `first_name` = "John" -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.deleteFrom('person')
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * async function deletePerson(id: number, returnLastName: boolean) {
   *   return await db
   *     .deleteFrom('person')
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `deletePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _DeleteQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `DeleteQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _DeleteQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', 3)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', 3)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _DeleteQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { Species } from 'type-editor' // imaginary module
   *
   * async function deletePersonAndPets(personId: number) {
   *   return await db
   *     .with('deleted_person', (qb) => qb
   *        .deleteFrom('person')
   *        .where('id', '=', personId)
   *        .returning('first_name')
   *        .$assertType<{ first_name: string }>()
   *     )
   *     .with('deleted_pets', (qb) => qb
   *       .deleteFrom('pet')
   *       .where('owner_id', '=', personId)
   *       .returning(['name as pet_name', 'species'])
   *       .$assertType<{ pet_name: string, species: Species }>()
   *     )
   *     .selectFrom(['deleted_person', 'deleted_pets'])
   *     .selectAll()
   *     .execute()
   * }
   * ```
   */
  $assertType() {
    return new _DeleteQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _DeleteQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery);
    const { adapter } = this.#props.executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [new DeleteResult(result.numAffectedRows ?? BigInt(0))];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};

// node_modules/kysely/dist/esm/query-builder/update-result.js
var UpdateResult = class {
  /**
   * The number of rows the update query updated (even if not changed).
   */
  numUpdatedRows;
  /**
   * The number of rows the update query changed.
   *
   * This is **optional** and only supported in dialects such as MySQL.
   * You would probably use {@link numUpdatedRows} in most cases.
   */
  numChangedRows;
  constructor(numUpdatedRows, numChangedRows) {
    this.numUpdatedRows = numUpdatedRows;
    this.numChangedRows = numChangedRows;
  }
};

// node_modules/kysely/dist/esm/query-builder/update-query-builder.js
var UpdateQueryBuilder = class _UpdateQueryBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  /**
   * Changes an `update` query into a `update top` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Update the first row:
   *
   * ```ts
   * await db.updateTable('person')
   *   .top(1)
   *   .set({ first_name: 'Foo' })
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * update top(1) "person" set "first_name" = @1 where "age" > @2
   * ```
   *
   * Update the 50% first rows:
   *
   * ```ts
   * await db.updateTable('person')
   *   .top(50, 'percent')
   *   .set({ first_name: 'Foo' })
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * update top(50) percent "person" set "first_name" = @1 where "age" > @2
   * ```
   */
  top(expression, modifiers) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  from(from) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: UpdateQueryNode.cloneWithFromItems(this.#props.queryNode, parseTableExpressionOrList(from))
    });
  }
  innerJoin(...args) {
    return this.#join("InnerJoin", args);
  }
  leftJoin(...args) {
    return this.#join("LeftJoin", args);
  }
  rightJoin(...args) {
    return this.#join("RightJoin", args);
  }
  fullJoin(...args) {
    return this.#join("FullJoin", args);
  }
  #join(joinType, args) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args))
    });
  }
  orderBy(...args) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args))
    });
  }
  clearOrderBy() {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode)
    });
  }
  /**
   * Adds a limit clause to the update query for supported databases, such as MySQL.
   *
   * ### Examples
   *
   * Update the first 2 rows in the 'person' table:
   *
   * ```ts
   * await db
   *   .updateTable('person')
   *   .set({ first_name: 'Foo' })
   *   .limit(2)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * update `person` set `first_name` = ? limit ?
   * ```
   */
  limit(limit) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: UpdateQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  set(...args) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: UpdateQueryNode.cloneWithUpdates(this.#props.queryNode, parseUpdate(...args))
    });
  }
  returning(selection) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll(table) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table))
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.updateTable('person')
   *   .set({ age: 39 })
   *   .where('first_name', '=', 'John')
   *   .modifyEnd(sql.raw('-- This is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * update `person`
   * set `age` = 39
   * where `first_name` = "John" -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.updateTable('person')
   *   .returningAll()
   *   .set({ age: 39 })
   *   .where('first_name', '=', 'John')
   *   .clearReturning()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * update "person" set "age" = 39 where "first_name" = "John"
   * ```
   */
  clearReturning() {
    return new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * const values = {
   *   first_name: 'John',
   * } satisfies PersonUpdate
   *
   * db.updateTable('person')
   *   .set(values)
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
   *   return await db
   *     .updateTable('person')
   *     .set(updates)
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `updatePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _UpdateQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `UpdateQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _UpdateQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link set} input
   * when using {@link where} and/or {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const id = 1
   * const now = new Date().toISOString()
   *
   * const person = await db.updateTable('person')
   *   .set({ deleted_at: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const id = 1
   * const now = new Date().toISOString()
   *
   * const person = await db.updateTable('person')
   *   .set({ deleted_at: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _UpdateQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
   *
   * const person = {
   *   id: 1,
   *   gender: 'other',
   * } satisfies PersonUpdate
   *
   * const pet = {
   *   name: 'Fluffy',
   * } satisfies PetUpdate
   *
   * const result = await db
   *   .with('updated_person', (qb) => qb
   *     .updateTable('person')
   *     .set(person)
   *     .where('id', '=', person.id)
   *     .returning('first_name')
   *     .$assertType<{ first_name: string }>()
   *   )
   *   .with('updated_pet', (qb) => qb
   *     .updateTable('pet')
   *     .set(pet)
   *     .where('owner_id', '=', person.id)
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['updated_person', 'updated_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new _UpdateQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _UpdateQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery);
    const { adapter } = this.#props.executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [
      new UpdateResult(result.numAffectedRows ?? BigInt(0), result.numChangedRows)
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};

// node_modules/kysely/dist/esm/operation-node/common-table-expression-name-node.js
var CommonTableExpressionNameNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNameNode";
  },
  create(tableName, columnNames) {
    return freeze({
      kind: "CommonTableExpressionNameNode",
      table: TableNode.create(tableName),
      columns: columnNames ? freeze(columnNames.map(ColumnNode.create)) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/common-table-expression-node.js
var CommonTableExpressionNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNode";
  },
  create(name, expression) {
    return freeze({
      kind: "CommonTableExpressionNode",
      name,
      expression
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/cte-builder.js
var CTEBuilder = class _CTEBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Makes the common table expression materialized.
   */
  materialized() {
    return new _CTEBuilder({
      ...this.#props,
      node: CommonTableExpressionNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  /**
   * Makes the common table expression not materialized.
   */
  notMaterialized() {
    return new _CTEBuilder({
      ...this.#props,
      node: CommonTableExpressionNode.cloneWith(this.#props.node, {
        materialized: false
      })
    });
  }
  toOperationNode() {
    return this.#props.node;
  }
};

// node_modules/kysely/dist/esm/parser/with-parser.js
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
  const expressionNode = expression(createQueryCreator()).toOperationNode();
  if (isFunction(nameOrBuilderCallback)) {
    return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
  }
  return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
  return (name) => {
    return new CTEBuilder({
      node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode)
    });
  };
}
function parseCommonTableExpressionName(name) {
  if (name.includes("(")) {
    const parts = name.split(/[\(\)]/);
    const table = parts[0];
    const columns = parts[1].split(",").map((it) => it.trim());
    return CommonTableExpressionNameNode.create(table, columns);
  } else {
    return CommonTableExpressionNameNode.create(name);
  }
}

// node_modules/kysely/dist/esm/operation-node/with-node.js
var WithNode = freeze({
  is(node) {
    return node.kind === "WithNode";
  },
  create(expression, params) {
    return freeze({
      kind: "WithNode",
      expressions: freeze([expression]),
      ...params
    });
  },
  cloneWithExpression(withNode, expression) {
    return freeze({
      ...withNode,
      expressions: freeze([...withNode.expressions, expression])
    });
  }
});

// node_modules/kysely/dist/esm/util/random-string.js
var CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
function randomString(length) {
  let chars = "";
  for (let i = 0; i < length; ++i) {
    chars += randomChar();
  }
  return chars;
}
function randomChar() {
  return CHARS[~~(Math.random() * CHARS.length)];
}

// node_modules/kysely/dist/esm/util/query-id.js
function createQueryId() {
  return new LazyQueryId();
}
var LazyQueryId = class {
  #queryId;
  get queryId() {
    if (this.#queryId === void 0) {
      this.#queryId = randomString(8);
    }
    return this.#queryId;
  }
};

// node_modules/kysely/dist/esm/util/require-all-props.js
function requireAllProps(obj) {
  return obj;
}

// node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js
var OperationNodeTransformer = class {
  nodeStack = [];
  #transformers = freeze({
    AliasNode: this.transformAlias.bind(this),
    ColumnNode: this.transformColumn.bind(this),
    IdentifierNode: this.transformIdentifier.bind(this),
    SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
    RawNode: this.transformRaw.bind(this),
    ReferenceNode: this.transformReference.bind(this),
    SelectQueryNode: this.transformSelectQuery.bind(this),
    SelectionNode: this.transformSelection.bind(this),
    TableNode: this.transformTable.bind(this),
    FromNode: this.transformFrom.bind(this),
    SelectAllNode: this.transformSelectAll.bind(this),
    AndNode: this.transformAnd.bind(this),
    OrNode: this.transformOr.bind(this),
    ValueNode: this.transformValue.bind(this),
    ValueListNode: this.transformValueList.bind(this),
    PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
    ParensNode: this.transformParens.bind(this),
    JoinNode: this.transformJoin.bind(this),
    OperatorNode: this.transformOperator.bind(this),
    WhereNode: this.transformWhere.bind(this),
    InsertQueryNode: this.transformInsertQuery.bind(this),
    DeleteQueryNode: this.transformDeleteQuery.bind(this),
    ReturningNode: this.transformReturning.bind(this),
    CreateTableNode: this.transformCreateTable.bind(this),
    AddColumnNode: this.transformAddColumn.bind(this),
    ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
    DropTableNode: this.transformDropTable.bind(this),
    DataTypeNode: this.transformDataType.bind(this),
    OrderByNode: this.transformOrderBy.bind(this),
    OrderByItemNode: this.transformOrderByItem.bind(this),
    GroupByNode: this.transformGroupBy.bind(this),
    GroupByItemNode: this.transformGroupByItem.bind(this),
    UpdateQueryNode: this.transformUpdateQuery.bind(this),
    ColumnUpdateNode: this.transformColumnUpdate.bind(this),
    LimitNode: this.transformLimit.bind(this),
    OffsetNode: this.transformOffset.bind(this),
    OnConflictNode: this.transformOnConflict.bind(this),
    OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
    CreateIndexNode: this.transformCreateIndex.bind(this),
    DropIndexNode: this.transformDropIndex.bind(this),
    ListNode: this.transformList.bind(this),
    PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
    UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
    ReferencesNode: this.transformReferences.bind(this),
    CheckConstraintNode: this.transformCheckConstraint.bind(this),
    WithNode: this.transformWith.bind(this),
    CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
    CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
    HavingNode: this.transformHaving.bind(this),
    CreateSchemaNode: this.transformCreateSchema.bind(this),
    DropSchemaNode: this.transformDropSchema.bind(this),
    AlterTableNode: this.transformAlterTable.bind(this),
    DropColumnNode: this.transformDropColumn.bind(this),
    RenameColumnNode: this.transformRenameColumn.bind(this),
    AlterColumnNode: this.transformAlterColumn.bind(this),
    ModifyColumnNode: this.transformModifyColumn.bind(this),
    AddConstraintNode: this.transformAddConstraint.bind(this),
    DropConstraintNode: this.transformDropConstraint.bind(this),
    RenameConstraintNode: this.transformRenameConstraint.bind(this),
    ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
    CreateViewNode: this.transformCreateView.bind(this),
    RefreshMaterializedViewNode: this.transformRefreshMaterializedView.bind(this),
    DropViewNode: this.transformDropView.bind(this),
    GeneratedNode: this.transformGenerated.bind(this),
    DefaultValueNode: this.transformDefaultValue.bind(this),
    OnNode: this.transformOn.bind(this),
    ValuesNode: this.transformValues.bind(this),
    SelectModifierNode: this.transformSelectModifier.bind(this),
    CreateTypeNode: this.transformCreateType.bind(this),
    DropTypeNode: this.transformDropType.bind(this),
    ExplainNode: this.transformExplain.bind(this),
    DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
    AggregateFunctionNode: this.transformAggregateFunction.bind(this),
    OverNode: this.transformOver.bind(this),
    PartitionByNode: this.transformPartitionBy.bind(this),
    PartitionByItemNode: this.transformPartitionByItem.bind(this),
    SetOperationNode: this.transformSetOperation.bind(this),
    BinaryOperationNode: this.transformBinaryOperation.bind(this),
    UnaryOperationNode: this.transformUnaryOperation.bind(this),
    UsingNode: this.transformUsing.bind(this),
    FunctionNode: this.transformFunction.bind(this),
    CaseNode: this.transformCase.bind(this),
    WhenNode: this.transformWhen.bind(this),
    JSONReferenceNode: this.transformJSONReference.bind(this),
    JSONPathNode: this.transformJSONPath.bind(this),
    JSONPathLegNode: this.transformJSONPathLeg.bind(this),
    JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
    TupleNode: this.transformTuple.bind(this),
    MergeQueryNode: this.transformMergeQuery.bind(this),
    MatchedNode: this.transformMatched.bind(this),
    AddIndexNode: this.transformAddIndex.bind(this),
    CastNode: this.transformCast.bind(this),
    FetchNode: this.transformFetch.bind(this),
    TopNode: this.transformTop.bind(this),
    OutputNode: this.transformOutput.bind(this),
    OrActionNode: this.transformOrAction.bind(this),
    CollateNode: this.transformCollate.bind(this)
  });
  transformNode(node, queryId) {
    if (!node) {
      return node;
    }
    this.nodeStack.push(node);
    const out = this.transformNodeImpl(node, queryId);
    this.nodeStack.pop();
    return freeze(out);
  }
  transformNodeImpl(node, queryId) {
    return this.#transformers[node.kind](node, queryId);
  }
  transformNodeList(list, queryId) {
    if (!list) {
      return list;
    }
    return freeze(list.map((node) => this.transformNode(node, queryId)));
  }
  transformSelectQuery(node, queryId) {
    return requireAllProps({
      kind: "SelectQueryNode",
      from: this.transformNode(node.from, queryId),
      selections: this.transformNodeList(node.selections, queryId),
      distinctOn: this.transformNodeList(node.distinctOn, queryId),
      joins: this.transformNodeList(node.joins, queryId),
      groupBy: this.transformNode(node.groupBy, queryId),
      orderBy: this.transformNode(node.orderBy, queryId),
      where: this.transformNode(node.where, queryId),
      frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      limit: this.transformNode(node.limit, queryId),
      offset: this.transformNode(node.offset, queryId),
      with: this.transformNode(node.with, queryId),
      having: this.transformNode(node.having, queryId),
      explain: this.transformNode(node.explain, queryId),
      setOperations: this.transformNodeList(node.setOperations, queryId),
      fetch: this.transformNode(node.fetch, queryId),
      top: this.transformNode(node.top, queryId)
    });
  }
  transformSelection(node, queryId) {
    return requireAllProps({
      kind: "SelectionNode",
      selection: this.transformNode(node.selection, queryId)
    });
  }
  transformColumn(node, queryId) {
    return requireAllProps({
      kind: "ColumnNode",
      column: this.transformNode(node.column, queryId)
    });
  }
  transformAlias(node, queryId) {
    return requireAllProps({
      kind: "AliasNode",
      node: this.transformNode(node.node, queryId),
      alias: this.transformNode(node.alias, queryId)
    });
  }
  transformTable(node, queryId) {
    return requireAllProps({
      kind: "TableNode",
      table: this.transformNode(node.table, queryId)
    });
  }
  transformFrom(node, queryId) {
    return requireAllProps({
      kind: "FromNode",
      froms: this.transformNodeList(node.froms, queryId)
    });
  }
  transformReference(node, queryId) {
    return requireAllProps({
      kind: "ReferenceNode",
      column: this.transformNode(node.column, queryId),
      table: this.transformNode(node.table, queryId)
    });
  }
  transformAnd(node, queryId) {
    return requireAllProps({
      kind: "AndNode",
      left: this.transformNode(node.left, queryId),
      right: this.transformNode(node.right, queryId)
    });
  }
  transformOr(node, queryId) {
    return requireAllProps({
      kind: "OrNode",
      left: this.transformNode(node.left, queryId),
      right: this.transformNode(node.right, queryId)
    });
  }
  transformValueList(node, queryId) {
    return requireAllProps({
      kind: "ValueListNode",
      values: this.transformNodeList(node.values, queryId)
    });
  }
  transformParens(node, queryId) {
    return requireAllProps({
      kind: "ParensNode",
      node: this.transformNode(node.node, queryId)
    });
  }
  transformJoin(node, queryId) {
    return requireAllProps({
      kind: "JoinNode",
      joinType: node.joinType,
      table: this.transformNode(node.table, queryId),
      on: this.transformNode(node.on, queryId)
    });
  }
  transformRaw(node, queryId) {
    return requireAllProps({
      kind: "RawNode",
      sqlFragments: freeze([...node.sqlFragments]),
      parameters: this.transformNodeList(node.parameters, queryId)
    });
  }
  transformWhere(node, queryId) {
    return requireAllProps({
      kind: "WhereNode",
      where: this.transformNode(node.where, queryId)
    });
  }
  transformInsertQuery(node, queryId) {
    return requireAllProps({
      kind: "InsertQueryNode",
      into: this.transformNode(node.into, queryId),
      columns: this.transformNodeList(node.columns, queryId),
      values: this.transformNode(node.values, queryId),
      returning: this.transformNode(node.returning, queryId),
      onConflict: this.transformNode(node.onConflict, queryId),
      onDuplicateKey: this.transformNode(node.onDuplicateKey, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      with: this.transformNode(node.with, queryId),
      ignore: node.ignore,
      orAction: this.transformNode(node.orAction, queryId),
      replace: node.replace,
      explain: this.transformNode(node.explain, queryId),
      defaultValues: node.defaultValues,
      top: this.transformNode(node.top, queryId),
      output: this.transformNode(node.output, queryId)
    });
  }
  transformValues(node, queryId) {
    return requireAllProps({
      kind: "ValuesNode",
      values: this.transformNodeList(node.values, queryId)
    });
  }
  transformDeleteQuery(node, queryId) {
    return requireAllProps({
      kind: "DeleteQueryNode",
      from: this.transformNode(node.from, queryId),
      using: this.transformNode(node.using, queryId),
      joins: this.transformNodeList(node.joins, queryId),
      where: this.transformNode(node.where, queryId),
      returning: this.transformNode(node.returning, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      with: this.transformNode(node.with, queryId),
      orderBy: this.transformNode(node.orderBy, queryId),
      limit: this.transformNode(node.limit, queryId),
      explain: this.transformNode(node.explain, queryId),
      top: this.transformNode(node.top, queryId),
      output: this.transformNode(node.output, queryId)
    });
  }
  transformReturning(node, queryId) {
    return requireAllProps({
      kind: "ReturningNode",
      selections: this.transformNodeList(node.selections, queryId)
    });
  }
  transformCreateTable(node, queryId) {
    return requireAllProps({
      kind: "CreateTableNode",
      table: this.transformNode(node.table, queryId),
      columns: this.transformNodeList(node.columns, queryId),
      constraints: this.transformNodeList(node.constraints, queryId),
      temporary: node.temporary,
      ifNotExists: node.ifNotExists,
      onCommit: node.onCommit,
      frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      selectQuery: this.transformNode(node.selectQuery, queryId)
    });
  }
  transformColumnDefinition(node, queryId) {
    return requireAllProps({
      kind: "ColumnDefinitionNode",
      column: this.transformNode(node.column, queryId),
      dataType: this.transformNode(node.dataType, queryId),
      references: this.transformNode(node.references, queryId),
      primaryKey: node.primaryKey,
      autoIncrement: node.autoIncrement,
      unique: node.unique,
      notNull: node.notNull,
      unsigned: node.unsigned,
      defaultTo: this.transformNode(node.defaultTo, queryId),
      check: this.transformNode(node.check, queryId),
      generated: this.transformNode(node.generated, queryId),
      frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      nullsNotDistinct: node.nullsNotDistinct,
      identity: node.identity,
      ifNotExists: node.ifNotExists
    });
  }
  transformAddColumn(node, queryId) {
    return requireAllProps({
      kind: "AddColumnNode",
      column: this.transformNode(node.column, queryId)
    });
  }
  transformDropTable(node, queryId) {
    return requireAllProps({
      kind: "DropTableNode",
      table: this.transformNode(node.table, queryId),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformOrderBy(node, queryId) {
    return requireAllProps({
      kind: "OrderByNode",
      items: this.transformNodeList(node.items, queryId)
    });
  }
  transformOrderByItem(node, queryId) {
    return requireAllProps({
      kind: "OrderByItemNode",
      orderBy: this.transformNode(node.orderBy, queryId),
      direction: this.transformNode(node.direction, queryId),
      collation: this.transformNode(node.collation, queryId),
      nulls: node.nulls
    });
  }
  transformGroupBy(node, queryId) {
    return requireAllProps({
      kind: "GroupByNode",
      items: this.transformNodeList(node.items, queryId)
    });
  }
  transformGroupByItem(node, queryId) {
    return requireAllProps({
      kind: "GroupByItemNode",
      groupBy: this.transformNode(node.groupBy, queryId)
    });
  }
  transformUpdateQuery(node, queryId) {
    return requireAllProps({
      kind: "UpdateQueryNode",
      table: this.transformNode(node.table, queryId),
      from: this.transformNode(node.from, queryId),
      joins: this.transformNodeList(node.joins, queryId),
      where: this.transformNode(node.where, queryId),
      updates: this.transformNodeList(node.updates, queryId),
      returning: this.transformNode(node.returning, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      with: this.transformNode(node.with, queryId),
      explain: this.transformNode(node.explain, queryId),
      limit: this.transformNode(node.limit, queryId),
      top: this.transformNode(node.top, queryId),
      output: this.transformNode(node.output, queryId),
      orderBy: this.transformNode(node.orderBy, queryId)
    });
  }
  transformColumnUpdate(node, queryId) {
    return requireAllProps({
      kind: "ColumnUpdateNode",
      column: this.transformNode(node.column, queryId),
      value: this.transformNode(node.value, queryId)
    });
  }
  transformLimit(node, queryId) {
    return requireAllProps({
      kind: "LimitNode",
      limit: this.transformNode(node.limit, queryId)
    });
  }
  transformOffset(node, queryId) {
    return requireAllProps({
      kind: "OffsetNode",
      offset: this.transformNode(node.offset, queryId)
    });
  }
  transformOnConflict(node, queryId) {
    return requireAllProps({
      kind: "OnConflictNode",
      columns: this.transformNodeList(node.columns, queryId),
      constraint: this.transformNode(node.constraint, queryId),
      indexExpression: this.transformNode(node.indexExpression, queryId),
      indexWhere: this.transformNode(node.indexWhere, queryId),
      updates: this.transformNodeList(node.updates, queryId),
      updateWhere: this.transformNode(node.updateWhere, queryId),
      doNothing: node.doNothing
    });
  }
  transformOnDuplicateKey(node, queryId) {
    return requireAllProps({
      kind: "OnDuplicateKeyNode",
      updates: this.transformNodeList(node.updates, queryId)
    });
  }
  transformCreateIndex(node, queryId) {
    return requireAllProps({
      kind: "CreateIndexNode",
      name: this.transformNode(node.name, queryId),
      table: this.transformNode(node.table, queryId),
      columns: this.transformNodeList(node.columns, queryId),
      unique: node.unique,
      using: this.transformNode(node.using, queryId),
      ifNotExists: node.ifNotExists,
      where: this.transformNode(node.where, queryId),
      nullsNotDistinct: node.nullsNotDistinct
    });
  }
  transformList(node, queryId) {
    return requireAllProps({
      kind: "ListNode",
      items: this.transformNodeList(node.items, queryId)
    });
  }
  transformDropIndex(node, queryId) {
    return requireAllProps({
      kind: "DropIndexNode",
      name: this.transformNode(node.name, queryId),
      table: this.transformNode(node.table, queryId),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformPrimaryKeyConstraint(node, queryId) {
    return requireAllProps({
      kind: "PrimaryKeyConstraintNode",
      columns: this.transformNodeList(node.columns, queryId),
      name: this.transformNode(node.name, queryId),
      deferrable: node.deferrable,
      initiallyDeferred: node.initiallyDeferred
    });
  }
  transformUniqueConstraint(node, queryId) {
    return requireAllProps({
      kind: "UniqueConstraintNode",
      columns: this.transformNodeList(node.columns, queryId),
      name: this.transformNode(node.name, queryId),
      nullsNotDistinct: node.nullsNotDistinct,
      deferrable: node.deferrable,
      initiallyDeferred: node.initiallyDeferred
    });
  }
  transformForeignKeyConstraint(node, queryId) {
    return requireAllProps({
      kind: "ForeignKeyConstraintNode",
      columns: this.transformNodeList(node.columns, queryId),
      references: this.transformNode(node.references, queryId),
      name: this.transformNode(node.name, queryId),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate,
      deferrable: node.deferrable,
      initiallyDeferred: node.initiallyDeferred
    });
  }
  transformSetOperation(node, queryId) {
    return requireAllProps({
      kind: "SetOperationNode",
      operator: node.operator,
      expression: this.transformNode(node.expression, queryId),
      all: node.all
    });
  }
  transformReferences(node, queryId) {
    return requireAllProps({
      kind: "ReferencesNode",
      table: this.transformNode(node.table, queryId),
      columns: this.transformNodeList(node.columns, queryId),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate
    });
  }
  transformCheckConstraint(node, queryId) {
    return requireAllProps({
      kind: "CheckConstraintNode",
      expression: this.transformNode(node.expression, queryId),
      name: this.transformNode(node.name, queryId)
    });
  }
  transformWith(node, queryId) {
    return requireAllProps({
      kind: "WithNode",
      expressions: this.transformNodeList(node.expressions, queryId),
      recursive: node.recursive
    });
  }
  transformCommonTableExpression(node, queryId) {
    return requireAllProps({
      kind: "CommonTableExpressionNode",
      name: this.transformNode(node.name, queryId),
      materialized: node.materialized,
      expression: this.transformNode(node.expression, queryId)
    });
  }
  transformCommonTableExpressionName(node, queryId) {
    return requireAllProps({
      kind: "CommonTableExpressionNameNode",
      table: this.transformNode(node.table, queryId),
      columns: this.transformNodeList(node.columns, queryId)
    });
  }
  transformHaving(node, queryId) {
    return requireAllProps({
      kind: "HavingNode",
      having: this.transformNode(node.having, queryId)
    });
  }
  transformCreateSchema(node, queryId) {
    return requireAllProps({
      kind: "CreateSchemaNode",
      schema: this.transformNode(node.schema, queryId),
      ifNotExists: node.ifNotExists
    });
  }
  transformDropSchema(node, queryId) {
    return requireAllProps({
      kind: "DropSchemaNode",
      schema: this.transformNode(node.schema, queryId),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformAlterTable(node, queryId) {
    return requireAllProps({
      kind: "AlterTableNode",
      table: this.transformNode(node.table, queryId),
      renameTo: this.transformNode(node.renameTo, queryId),
      setSchema: this.transformNode(node.setSchema, queryId),
      columnAlterations: this.transformNodeList(node.columnAlterations, queryId),
      addConstraint: this.transformNode(node.addConstraint, queryId),
      dropConstraint: this.transformNode(node.dropConstraint, queryId),
      renameConstraint: this.transformNode(node.renameConstraint, queryId),
      addIndex: this.transformNode(node.addIndex, queryId),
      dropIndex: this.transformNode(node.dropIndex, queryId)
    });
  }
  transformDropColumn(node, queryId) {
    return requireAllProps({
      kind: "DropColumnNode",
      column: this.transformNode(node.column, queryId)
    });
  }
  transformRenameColumn(node, queryId) {
    return requireAllProps({
      kind: "RenameColumnNode",
      column: this.transformNode(node.column, queryId),
      renameTo: this.transformNode(node.renameTo, queryId)
    });
  }
  transformAlterColumn(node, queryId) {
    return requireAllProps({
      kind: "AlterColumnNode",
      column: this.transformNode(node.column, queryId),
      dataType: this.transformNode(node.dataType, queryId),
      dataTypeExpression: this.transformNode(node.dataTypeExpression, queryId),
      setDefault: this.transformNode(node.setDefault, queryId),
      dropDefault: node.dropDefault,
      setNotNull: node.setNotNull,
      dropNotNull: node.dropNotNull
    });
  }
  transformModifyColumn(node, queryId) {
    return requireAllProps({
      kind: "ModifyColumnNode",
      column: this.transformNode(node.column, queryId)
    });
  }
  transformAddConstraint(node, queryId) {
    return requireAllProps({
      kind: "AddConstraintNode",
      constraint: this.transformNode(node.constraint, queryId)
    });
  }
  transformDropConstraint(node, queryId) {
    return requireAllProps({
      kind: "DropConstraintNode",
      constraintName: this.transformNode(node.constraintName, queryId),
      ifExists: node.ifExists,
      modifier: node.modifier
    });
  }
  transformRenameConstraint(node, queryId) {
    return requireAllProps({
      kind: "RenameConstraintNode",
      oldName: this.transformNode(node.oldName, queryId),
      newName: this.transformNode(node.newName, queryId)
    });
  }
  transformCreateView(node, queryId) {
    return requireAllProps({
      kind: "CreateViewNode",
      name: this.transformNode(node.name, queryId),
      temporary: node.temporary,
      orReplace: node.orReplace,
      ifNotExists: node.ifNotExists,
      materialized: node.materialized,
      columns: this.transformNodeList(node.columns, queryId),
      as: this.transformNode(node.as, queryId)
    });
  }
  transformRefreshMaterializedView(node, queryId) {
    return requireAllProps({
      kind: "RefreshMaterializedViewNode",
      name: this.transformNode(node.name, queryId),
      concurrently: node.concurrently,
      withNoData: node.withNoData
    });
  }
  transformDropView(node, queryId) {
    return requireAllProps({
      kind: "DropViewNode",
      name: this.transformNode(node.name, queryId),
      ifExists: node.ifExists,
      materialized: node.materialized,
      cascade: node.cascade
    });
  }
  transformGenerated(node, queryId) {
    return requireAllProps({
      kind: "GeneratedNode",
      byDefault: node.byDefault,
      always: node.always,
      identity: node.identity,
      stored: node.stored,
      expression: this.transformNode(node.expression, queryId)
    });
  }
  transformDefaultValue(node, queryId) {
    return requireAllProps({
      kind: "DefaultValueNode",
      defaultValue: this.transformNode(node.defaultValue, queryId)
    });
  }
  transformOn(node, queryId) {
    return requireAllProps({
      kind: "OnNode",
      on: this.transformNode(node.on, queryId)
    });
  }
  transformSelectModifier(node, queryId) {
    return requireAllProps({
      kind: "SelectModifierNode",
      modifier: node.modifier,
      rawModifier: this.transformNode(node.rawModifier, queryId),
      of: this.transformNodeList(node.of, queryId)
    });
  }
  transformCreateType(node, queryId) {
    return requireAllProps({
      kind: "CreateTypeNode",
      name: this.transformNode(node.name, queryId),
      enum: this.transformNode(node.enum, queryId)
    });
  }
  transformDropType(node, queryId) {
    return requireAllProps({
      kind: "DropTypeNode",
      name: this.transformNode(node.name, queryId),
      ifExists: node.ifExists
    });
  }
  transformExplain(node, queryId) {
    return requireAllProps({
      kind: "ExplainNode",
      format: node.format,
      options: this.transformNode(node.options, queryId)
    });
  }
  transformSchemableIdentifier(node, queryId) {
    return requireAllProps({
      kind: "SchemableIdentifierNode",
      schema: this.transformNode(node.schema, queryId),
      identifier: this.transformNode(node.identifier, queryId)
    });
  }
  transformAggregateFunction(node, queryId) {
    return requireAllProps({
      kind: "AggregateFunctionNode",
      func: node.func,
      aggregated: this.transformNodeList(node.aggregated, queryId),
      distinct: node.distinct,
      orderBy: this.transformNode(node.orderBy, queryId),
      withinGroup: this.transformNode(node.withinGroup, queryId),
      filter: this.transformNode(node.filter, queryId),
      over: this.transformNode(node.over, queryId)
    });
  }
  transformOver(node, queryId) {
    return requireAllProps({
      kind: "OverNode",
      orderBy: this.transformNode(node.orderBy, queryId),
      partitionBy: this.transformNode(node.partitionBy, queryId)
    });
  }
  transformPartitionBy(node, queryId) {
    return requireAllProps({
      kind: "PartitionByNode",
      items: this.transformNodeList(node.items, queryId)
    });
  }
  transformPartitionByItem(node, queryId) {
    return requireAllProps({
      kind: "PartitionByItemNode",
      partitionBy: this.transformNode(node.partitionBy, queryId)
    });
  }
  transformBinaryOperation(node, queryId) {
    return requireAllProps({
      kind: "BinaryOperationNode",
      leftOperand: this.transformNode(node.leftOperand, queryId),
      operator: this.transformNode(node.operator, queryId),
      rightOperand: this.transformNode(node.rightOperand, queryId)
    });
  }
  transformUnaryOperation(node, queryId) {
    return requireAllProps({
      kind: "UnaryOperationNode",
      operator: this.transformNode(node.operator, queryId),
      operand: this.transformNode(node.operand, queryId)
    });
  }
  transformUsing(node, queryId) {
    return requireAllProps({
      kind: "UsingNode",
      tables: this.transformNodeList(node.tables, queryId)
    });
  }
  transformFunction(node, queryId) {
    return requireAllProps({
      kind: "FunctionNode",
      func: node.func,
      arguments: this.transformNodeList(node.arguments, queryId)
    });
  }
  transformCase(node, queryId) {
    return requireAllProps({
      kind: "CaseNode",
      value: this.transformNode(node.value, queryId),
      when: this.transformNodeList(node.when, queryId),
      else: this.transformNode(node.else, queryId),
      isStatement: node.isStatement
    });
  }
  transformWhen(node, queryId) {
    return requireAllProps({
      kind: "WhenNode",
      condition: this.transformNode(node.condition, queryId),
      result: this.transformNode(node.result, queryId)
    });
  }
  transformJSONReference(node, queryId) {
    return requireAllProps({
      kind: "JSONReferenceNode",
      reference: this.transformNode(node.reference, queryId),
      traversal: this.transformNode(node.traversal, queryId)
    });
  }
  transformJSONPath(node, queryId) {
    return requireAllProps({
      kind: "JSONPathNode",
      inOperator: this.transformNode(node.inOperator, queryId),
      pathLegs: this.transformNodeList(node.pathLegs, queryId)
    });
  }
  transformJSONPathLeg(node, _queryId) {
    return requireAllProps({
      kind: "JSONPathLegNode",
      type: node.type,
      value: node.value
    });
  }
  transformJSONOperatorChain(node, queryId) {
    return requireAllProps({
      kind: "JSONOperatorChainNode",
      operator: this.transformNode(node.operator, queryId),
      values: this.transformNodeList(node.values, queryId)
    });
  }
  transformTuple(node, queryId) {
    return requireAllProps({
      kind: "TupleNode",
      values: this.transformNodeList(node.values, queryId)
    });
  }
  transformMergeQuery(node, queryId) {
    return requireAllProps({
      kind: "MergeQueryNode",
      into: this.transformNode(node.into, queryId),
      using: this.transformNode(node.using, queryId),
      whens: this.transformNodeList(node.whens, queryId),
      with: this.transformNode(node.with, queryId),
      top: this.transformNode(node.top, queryId),
      endModifiers: this.transformNodeList(node.endModifiers, queryId),
      output: this.transformNode(node.output, queryId),
      returning: this.transformNode(node.returning, queryId)
    });
  }
  transformMatched(node, _queryId) {
    return requireAllProps({
      kind: "MatchedNode",
      not: node.not,
      bySource: node.bySource
    });
  }
  transformAddIndex(node, queryId) {
    return requireAllProps({
      kind: "AddIndexNode",
      name: this.transformNode(node.name, queryId),
      columns: this.transformNodeList(node.columns, queryId),
      unique: node.unique,
      using: this.transformNode(node.using, queryId),
      ifNotExists: node.ifNotExists
    });
  }
  transformCast(node, queryId) {
    return requireAllProps({
      kind: "CastNode",
      expression: this.transformNode(node.expression, queryId),
      dataType: this.transformNode(node.dataType, queryId)
    });
  }
  transformFetch(node, queryId) {
    return requireAllProps({
      kind: "FetchNode",
      rowCount: this.transformNode(node.rowCount, queryId),
      modifier: node.modifier
    });
  }
  transformTop(node, _queryId) {
    return requireAllProps({
      kind: "TopNode",
      expression: node.expression,
      modifiers: node.modifiers
    });
  }
  transformOutput(node, queryId) {
    return requireAllProps({
      kind: "OutputNode",
      selections: this.transformNodeList(node.selections, queryId)
    });
  }
  transformDataType(node, _queryId) {
    return node;
  }
  transformSelectAll(node, _queryId) {
    return node;
  }
  transformIdentifier(node, _queryId) {
    return node;
  }
  transformValue(node, _queryId) {
    return node;
  }
  transformPrimitiveValueList(node, _queryId) {
    return node;
  }
  transformOperator(node, _queryId) {
    return node;
  }
  transformDefaultInsertValue(node, _queryId) {
    return node;
  }
  transformOrAction(node, _queryId) {
    return node;
  }
  transformCollate(node, _queryId) {
    return node;
  }
};

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js
var ROOT_OPERATION_NODES = freeze({
  AlterTableNode: true,
  CreateIndexNode: true,
  CreateSchemaNode: true,
  CreateTableNode: true,
  CreateTypeNode: true,
  CreateViewNode: true,
  RefreshMaterializedViewNode: true,
  DeleteQueryNode: true,
  DropIndexNode: true,
  DropSchemaNode: true,
  DropTableNode: true,
  DropTypeNode: true,
  DropViewNode: true,
  InsertQueryNode: true,
  RawNode: true,
  SelectQueryNode: true,
  UpdateQueryNode: true,
  MergeQueryNode: true
});
var SCHEMALESS_FUNCTIONS = {
  json_agg: true,
  to_json: true
};
var WithSchemaTransformer = class extends OperationNodeTransformer {
  #schema;
  #schemableIds = /* @__PURE__ */ new Set();
  #ctes = /* @__PURE__ */ new Set();
  constructor(schema) {
    super();
    this.#schema = schema;
  }
  transformNodeImpl(node, queryId) {
    if (!this.#isRootOperationNode(node)) {
      return super.transformNodeImpl(node, queryId);
    }
    const ctes = this.#collectCTEs(node);
    for (const cte of ctes) {
      this.#ctes.add(cte);
    }
    const tables = this.#collectSchemableIds(node);
    for (const table of tables) {
      this.#schemableIds.add(table);
    }
    const transformed = super.transformNodeImpl(node, queryId);
    for (const table of tables) {
      this.#schemableIds.delete(table);
    }
    for (const cte of ctes) {
      this.#ctes.delete(cte);
    }
    return transformed;
  }
  transformSchemableIdentifier(node, queryId) {
    const transformed = super.transformSchemableIdentifier(node, queryId);
    if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
      return transformed;
    }
    return {
      ...transformed,
      schema: IdentifierNode.create(this.#schema)
    };
  }
  transformReferences(node, queryId) {
    const transformed = super.transformReferences(node, queryId);
    if (transformed.table.table.schema) {
      return transformed;
    }
    return {
      ...transformed,
      table: TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name)
    };
  }
  transformAggregateFunction(node, queryId) {
    return {
      ...super.transformAggregateFunction({ ...node, aggregated: [] }, queryId),
      aggregated: this.#transformTableArgsWithoutSchemas(node, queryId, "aggregated")
    };
  }
  transformFunction(node, queryId) {
    return {
      ...super.transformFunction({ ...node, arguments: [] }, queryId),
      arguments: this.#transformTableArgsWithoutSchemas(node, queryId, "arguments")
    };
  }
  #transformTableArgsWithoutSchemas(node, queryId, argsKey) {
    return SCHEMALESS_FUNCTIONS[node.func] ? node[argsKey].map((arg) => !TableNode.is(arg) || arg.table.schema ? this.transformNode(arg, queryId) : {
      ...arg,
      table: this.transformIdentifier(arg.table.identifier, queryId)
    }) : this.transformNodeList(node[argsKey], queryId);
  }
  #isRootOperationNode(node) {
    return node.kind in ROOT_OPERATION_NODES;
  }
  #collectSchemableIds(node) {
    const schemableIds = /* @__PURE__ */ new Set();
    if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) {
      this.#collectSchemableId(node.name, schemableIds);
    }
    if ("from" in node && node.from) {
      for (const from of node.from.froms) {
        this.#collectSchemableIdsFromTableExpr(from, schemableIds);
      }
    }
    if ("into" in node && node.into) {
      this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
    }
    if ("table" in node && node.table) {
      this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
    }
    if ("joins" in node && node.joins) {
      for (const join of node.joins) {
        this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
      }
    }
    if ("using" in node && node.using) {
      if (JoinNode.is(node.using)) {
        this.#collectSchemableIdsFromTableExpr(node.using.table, schemableIds);
      } else {
        this.#collectSchemableIdsFromTableExpr(node.using, schemableIds);
      }
    }
    return schemableIds;
  }
  #collectCTEs(node) {
    const ctes = /* @__PURE__ */ new Set();
    if ("with" in node && node.with) {
      this.#collectCTEIds(node.with, ctes);
    }
    return ctes;
  }
  #collectSchemableIdsFromTableExpr(node, schemableIds) {
    if (TableNode.is(node)) {
      this.#collectSchemableId(node.table, schemableIds);
    } else if (AliasNode.is(node) && TableNode.is(node.node)) {
      this.#collectSchemableId(node.node.table, schemableIds);
    } else if (ListNode.is(node)) {
      for (const table of node.items) {
        this.#collectSchemableIdsFromTableExpr(table, schemableIds);
      }
    }
  }
  #collectSchemableId(node, schemableIds) {
    const id = node.identifier.name;
    if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
      schemableIds.add(id);
    }
  }
  #collectCTEIds(node, ctes) {
    for (const expr of node.expressions) {
      const cteId = expr.name.table.table.identifier.name;
      if (!this.#ctes.has(cteId)) {
        ctes.add(cteId);
      }
    }
  }
};

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js
var WithSchemaPlugin = class {
  #transformer;
  constructor(schema) {
    this.#transformer = new WithSchemaTransformer(schema);
  }
  transformQuery(args) {
    return this.#transformer.transformNode(args.node, args.queryId);
  }
  async transformResult(args) {
    return args.result;
  }
};

// node_modules/kysely/dist/esm/operation-node/matched-node.js
var MatchedNode = freeze({
  is(node) {
    return node.kind === "MatchedNode";
  },
  create(not, bySource = false) {
    return freeze({
      kind: "MatchedNode",
      not,
      bySource
    });
  }
});

// node_modules/kysely/dist/esm/parser/merge-parser.js
function parseMergeWhen(type, args, refRight) {
  return WhenNode.create(parseFilterList([
    MatchedNode.create(!type.isMatched, type.bySource),
    ...args && args.length > 0 ? [
      args.length === 3 && refRight ? parseReferentialBinaryOperation(args[0], args[1], args[2]) : parseValueBinaryOperationOrExpression(args)
    ] : []
  ], "and", false));
}
function parseMergeThen(result) {
  if (isString(result)) {
    return RawNode.create([result], []);
  }
  if (isOperationNodeSource(result)) {
    return result.toOperationNode();
  }
  return result;
}

// node_modules/kysely/dist/esm/util/deferred.js
var Deferred = class {
  #promise;
  #resolve;
  #reject;
  constructor() {
    this.#promise = new Promise((resolve, reject) => {
      this.#reject = reject;
      this.#resolve = resolve;
    });
  }
  get promise() {
    return this.#promise;
  }
  resolve = (value) => {
    if (this.#resolve) {
      this.#resolve(value);
    }
  };
  reject = (reason) => {
    if (this.#reject) {
      this.#reject(reason);
    }
  };
};

// node_modules/kysely/dist/esm/util/provide-controlled-connection.js
async function provideControlledConnection(connectionProvider) {
  const connectionDefer = new Deferred();
  const connectionReleaseDefer = new Deferred();
  connectionProvider.provideConnection(async (connection) => {
    connectionDefer.resolve(connection);
    return await connectionReleaseDefer.promise;
  }).catch((ex) => connectionDefer.reject(ex));
  return freeze({
    connection: await connectionDefer.promise,
    release: connectionReleaseDefer.resolve
  });
}

// node_modules/kysely/dist/esm/query-executor/query-executor-base.js
var NO_PLUGINS = freeze([]);
var QueryExecutorBase = class {
  #plugins;
  constructor(plugins = NO_PLUGINS) {
    this.#plugins = plugins;
  }
  get plugins() {
    return this.#plugins;
  }
  transformQuery(node, queryId) {
    for (const plugin of this.#plugins) {
      const transformedNode = plugin.transformQuery({ node, queryId });
      if (transformedNode.kind === node.kind) {
        node = transformedNode;
      } else {
        throw new Error([
          `KyselyPlugin.transformQuery must return a node`,
          `of the same kind that was given to it.`,
          `The plugin was given a ${node.kind}`,
          `but it returned a ${transformedNode.kind}`
        ].join(" "));
      }
    }
    return node;
  }
  async executeQuery(compiledQuery) {
    return await this.provideConnection(async (connection) => {
      const result = await connection.executeQuery(compiledQuery);
      if ("numUpdatedOrDeletedRows" in result) {
        logOnce("kysely:warning: outdated driver/plugin detected! `QueryResult.numUpdatedOrDeletedRows` has been replaced with `QueryResult.numAffectedRows`.");
      }
      return await this.#transformResult(result, compiledQuery.queryId);
    });
  }
  async *stream(compiledQuery, chunkSize) {
    const { connection, release } = await provideControlledConnection(this);
    try {
      for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
        yield await this.#transformResult(result, compiledQuery.queryId);
      }
    } finally {
      release();
    }
  }
  async #transformResult(result, queryId) {
    for (const plugin of this.#plugins) {
      result = await plugin.transformResult({ result, queryId });
    }
    return result;
  }
};

// node_modules/kysely/dist/esm/query-executor/noop-query-executor.js
var NoopQueryExecutor = class _NoopQueryExecutor extends QueryExecutorBase {
  get adapter() {
    throw new Error("this query cannot be compiled to SQL");
  }
  compileQuery() {
    throw new Error("this query cannot be compiled to SQL");
  }
  provideConnection() {
    throw new Error("this query cannot be executed");
  }
  withConnectionProvider() {
    throw new Error("this query cannot have a connection provider");
  }
  withPlugin(plugin) {
    return new _NoopQueryExecutor([...this.plugins, plugin]);
  }
  withPlugins(plugins) {
    return new _NoopQueryExecutor([...this.plugins, ...plugins]);
  }
  withPluginAtFront(plugin) {
    return new _NoopQueryExecutor([plugin, ...this.plugins]);
  }
  withoutPlugins() {
    return new _NoopQueryExecutor([]);
  }
};
var NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();

// node_modules/kysely/dist/esm/query-builder/merge-result.js
var MergeResult = class {
  numChangedRows;
  constructor(numChangedRows) {
    this.numChangedRows = numChangedRows;
  }
};

// node_modules/kysely/dist/esm/query-builder/merge-query-builder.js
var MergeQueryBuilder = class _MergeQueryBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .mergeInto('person')
   *   .using('pet', 'pet.owner_id', 'person.id')
   *   .whenMatched()
   *   .thenDelete()
   *   .modifyEnd(sql.raw('-- this is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Changes a `merge into` query to an `merge top into` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Affect 5 matched rows at most:
   *
   * ```ts
   * await db.mergeInto('person')
   *   .top(5)
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * merge top(5) into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   *
   * Affect 50% of matched rows:
   *
   * ```ts
   * await db.mergeInto('person')
   *   .top(50, 'percent')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * merge top(50) percent into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  top(expression, modifiers) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  using(...args) {
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithUsing(this.#props.queryNode, parseJoin("Using", args))
    });
  }
  returning(args) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(args))
    });
  }
  returningAll(table) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _MergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table))
    });
  }
};
var WheneableMergeQueryBuilder = class _WheneableMergeQueryBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .mergeInto('person')
   *   .using('pet', 'pet.owner_id', 'person.id')
   *   .whenMatched()
   *   .thenDelete()
   *   .modifyEnd(sql.raw('-- this is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
    });
  }
  /**
   * See {@link MergeQueryBuilder.top}.
   */
  top(expression, modifiers) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  /**
   * Adds a simple `when matched` clause to the query.
   *
   * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
   *
   * For a simple `when not matched` clause, see {@link whenNotMatched}.
   *
   * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  whenMatched() {
    return this.#whenMatched([]);
  }
  whenMatchedAnd(...args) {
    return this.#whenMatched(args);
  }
  /**
   * Adds the `when matched` clause to the query with an `and` condition. But unlike
   * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
   *
   * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
   * for that method for more examples.
   */
  whenMatchedAndRef(lhs, op, rhs) {
    return this.#whenMatched([lhs, op, rhs], true);
  }
  #whenMatched(args, refRight) {
    return new MatchedThenableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: true }, args, refRight))
    });
  }
  /**
   * Adds a simple `when not matched` clause to the query.
   *
   * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
   *
   * For a simple `when matched` clause, see {@link whenMatched}.
   *
   * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenNotMatched()
   *   .thenInsertValues({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when not matched then
   *   insert ("first_name", "last_name") values ($1, $2)
   * ```
   */
  whenNotMatched() {
    return this.#whenNotMatched([]);
  }
  whenNotMatchedAnd(...args) {
    return this.#whenNotMatched(args);
  }
  /**
   * Adds the `when not matched` clause to the query with an `and` condition. But unlike
   * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
   *
   * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
   *
   * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
   * for that method for more examples.
   */
  whenNotMatchedAndRef(lhs, op, rhs) {
    return this.#whenNotMatched([lhs, op, rhs], true);
  }
  /**
   * Adds a simple `when not matched by source` clause to the query.
   *
   * Supported in MS SQL Server.
   *
   * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
   */
  whenNotMatchedBySource() {
    return this.#whenNotMatched([], false, true);
  }
  whenNotMatchedBySourceAnd(...args) {
    return this.#whenNotMatched(args, false, true);
  }
  /**
   * Adds the `when not matched by source` clause to the query with an `and` condition.
   *
   * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
   * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
   */
  whenNotMatchedBySourceAndRef(lhs, op, rhs) {
    return this.#whenNotMatched([lhs, op, rhs], true, true);
  }
  returning(args) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(args))
    });
  }
  returningAll(table) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table))
    });
  }
  #whenNotMatched(args, refRight = false, bySource = false) {
    const props = {
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: false, bySource }, args, refRight))
    };
    const Builder = bySource ? MatchedThenableMergeQueryBuilder : NotMatchedThenableMergeQueryBuilder;
    return new Builder(props);
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.updateTable('person')
   *   .set({ first_name: 'John' })
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
   *   return await db
   *     .updateTable('person')
   *     .set(updates)
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `updatePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _WheneableMergeQueryBuilder({
      ...this.#props
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery);
    const { adapter } = this.#props.executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [new MergeResult(result.numAffectedRows)];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
};
var MatchedThenableMergeQueryBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Performs the `delete` action.
   *
   * To perform the `do nothing` action, see {@link thenDoNothing}.
   *
   * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  thenDelete() {
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen("delete"))
    });
  }
  /**
   * Performs the `do nothing` action.
   *
   * This is supported in PostgreSQL.
   *
   * To perform the `delete` action, see {@link thenDelete}.
   *
   * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDoNothing()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   do nothing
   * ```
   */
  thenDoNothing() {
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen("do nothing"))
    });
  }
  /**
   * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
   * This is handy when multiple `set` invocations are needed.
   *
   * For a shorthand version of this method, see {@link thenUpdateSet}.
   *
   * To perform the `delete` action, see {@link thenDelete}.
   *
   * To perform the `do nothing` action, see {@link thenDoNothing}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenUpdate((ub) => ub
   *     .set(sql`metadata['has_pets']`, 'Y')
   *     .set({
   *       updated_at: new Date().toISOString(),
   *     })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   update set metadata['has_pets'] = $1, "updated_at" = $2
   * ```
   */
  thenUpdate(set) {
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(set(new UpdateQueryBuilder({
        queryId: this.#props.queryId,
        executor: NOOP_QUERY_EXECUTOR,
        queryNode: UpdateQueryNode.createWithoutTable()
      }))))
    });
  }
  thenUpdateSet(...args) {
    return this.thenUpdate((ub) => ub.set(...args));
  }
};
var NotMatchedThenableMergeQueryBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Performs the `do nothing` action.
   *
   * This is supported in PostgreSQL.
   *
   * To perform the `insert` action, see {@link thenInsertValues}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenNotMatched()
   *   .thenDoNothing()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when not matched then
   *   do nothing
   * ```
   */
  thenDoNothing() {
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen("do nothing"))
    });
  }
  thenInsertValues(insert) {
    const [columns, values] = parseInsertExpression(insert);
    return new WheneableMergeQueryBuilder({
      ...this.#props,
      queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(InsertQueryNode.cloneWith(InsertQueryNode.createWithoutInto(), {
        columns,
        values
      })))
    });
  }
};

// node_modules/kysely/dist/esm/query-creator.js
var QueryCreator = class _QueryCreator {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Creates a `select` query builder for the given table or tables.
   *
   * The tables passed to this method are built as the query's `from` clause.
   *
   * ### Examples
   *
   * Create a select query for one table:
   *
   * ```ts
   * db.selectFrom('person').selectAll()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select * from "person"
   * ```
   *
   * Create a select query for one table with an alias:
   *
   * ```ts
   * const persons = await db.selectFrom('person as p')
   *   .select(['p.id', 'first_name'])
   *   .execute()
   *
   * console.log(persons[0].id)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p"."id", "first_name" from "person" as "p"
   * ```
   *
   * Create a select query from a subquery:
   *
   * ```ts
   * const persons = await db.selectFrom(
   *     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
   *   )
   *   .select('p.identifier')
   *   .execute()
   *
   * console.log(persons[0].identifier)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p"."identifier",
   * from (
   *   select "person"."id" as "identifier" from "person"
   * ) as p
   * ```
   *
   * Create a select query from raw sql:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const items = await db
   *   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
   *   .select('q.one')
   *   .execute()
   *
   * console.log(items[0].one)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "q"."one",
   * from (
   *   select 1 as one
   * ) as q
   * ```
   *
   * When you use the `sql` tag you need to also provide the result type of the
   * raw snippet / query so that Kysely can figure out what columns are
   * available for the rest of the query.
   *
   * The `selectFrom` method also accepts an array for multiple tables. All
   * the above examples can also be used in an array.
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const items = await db.selectFrom([
   *     'person as p',
   *     db.selectFrom('pet').select('pet.species').as('a'),
   *     sql<{ one: number }>`(select 1 as one)`.as('q')
   *   ])
   *   .select(['p.id', 'a.species', 'q.one'])
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p".id, "a"."species", "q"."one"
   * from
   *   "person" as "p",
   *   (select "pet"."species" from "pet") as a,
   *   (select 1 as one) as "q"
   * ```
   */
  selectFrom(from) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), this.#props.withNode)
    });
  }
  selectNoFrom(selection) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(this.#props.withNode), parseSelectArg(selection))
    });
  }
  /**
   * Creates an insert query.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
   * the {@link ReturningInterface.returning | returning} method for a way to return columns
   * on supported databases like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirst()
   *
   * console.log(result.insertId)
   * ```
   *
   * Some databases like PostgreSQL support the `returning` method:
   *
   * ```ts
   * const { id } = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .returning('id')
   *   .executeTakeFirstOrThrow()
   * ```
   */
  insertInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode)
    });
  }
  /**
   * Creates a "replace into" query.
   *
   * This is only supported by some dialects like MySQL or SQLite.
   *
   * Similar to MySQL's {@link InsertQueryBuilder.onDuplicateKeyUpdate} that deletes
   * and inserts values on collision instead of updating existing rows.
   *
   * An alias of SQLite's {@link InsertQueryBuilder.orReplace}.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .replaceInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirstOrThrow()
   *
   * console.log(result.insertId)
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * replace into `person` (`first_name`, `last_name`) values (?, ?)
   * ```
   */
  replaceInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode, true)
    });
  }
  /**
   * Creates a delete query.
   *
   * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
   * a where clause for the delete operation.
   *
   * The return value of the query is an instance of {@link DeleteResult}.
   *
   * ### Examples
   *
   * <!-- siteExample("delete", "Single row", 10) -->
   *
   * Delete a single row:
   *
   * ```ts
   * const result = await db
   *   .deleteFrom('person')
   *   .where('person.id', '=', 1)
   *   .executeTakeFirst()
   *
   * console.log(result.numDeletedRows)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * delete from "person" where "person"."id" = $1
   * ```
   *
   * Some databases such as MySQL support deleting from multiple tables:
   *
   * ```ts
   * const result = await db
   *   .deleteFrom(['person', 'pet'])
   *   .using('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .where('person.id', '=', 1)
   *   .executeTakeFirst()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `person`, `pet`
   * using `person`
   * inner join `pet` on `pet`.`owner_id` = `person`.`id`
   * where `person`.`id` = ?
   * ```
   */
  deleteFrom(from) {
    return new DeleteQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: DeleteQueryNode.create(parseTableExpressionOrList(from), this.#props.withNode)
    });
  }
  /**
   * Creates an update query.
   *
   * See the {@link UpdateQueryBuilder.where} method for examples on how to specify
   * a where clause for the update operation.
   *
   * See the {@link UpdateQueryBuilder.set} method for examples on how to
   * specify the updates.
   *
   * The return value of the query is an {@link UpdateResult}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .updateTable('person')
   *   .set({ first_name: 'Jennifer' })
   *   .where('person.id', '=', 1)
   *   .executeTakeFirst()
   *
   * console.log(result.numUpdatedRows)
   * ```
   */
  updateTable(tables) {
    return new UpdateQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: UpdateQueryNode.create(parseTableExpressionOrList(tables), this.#props.withNode)
    });
  }
  /**
   * Creates a merge query.
   *
   * The return value of the query is a {@link MergeResult}.
   *
   * See the {@link MergeQueryBuilder.using} method for examples on how to specify
   * the other table.
   *
   * ### Examples
   *
   * <!-- siteExample("merge", "Source row existence", 10) -->
   *
   * Update a target column based on the existence of a source row:
   *
   * ```ts
   * const result = await db
   *   .mergeInto('person as target')
   *   .using('pet as source', 'source.owner_id', 'target.id')
   *   .whenMatchedAnd('target.has_pets', '!=', 'Y')
   *   .thenUpdateSet({ has_pets: 'Y' })
   *   .whenNotMatchedBySourceAnd('target.has_pets', '=', 'Y')
   *   .thenUpdateSet({ has_pets: 'N' })
   *   .executeTakeFirstOrThrow()
   *
   * console.log(result.numChangedRows)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet"
   * on "pet"."owner_id" = "person"."id"
   * when matched and "has_pets" != $1
   * then update set "has_pets" = $2
   * when not matched by source and "has_pets" = $3
   * then update set "has_pets" = $4
   * ```
   *
   * <!-- siteExample("merge", "Temporary changes table", 20) -->
   *
   * Merge new entries from a temporary changes table:
   *
   * ```ts
   * const result = await db
   *   .mergeInto('wine as target')
   *   .using(
   *     'wine_stock_change as source',
   *     'source.wine_name',
   *     'target.name',
   *   )
   *   .whenNotMatchedAnd('source.stock_delta', '>', 0)
   *   .thenInsertValues(({ ref }) => ({
   *     name: ref('source.wine_name'),
   *     stock: ref('source.stock_delta'),
   *   }))
   *   .whenMatchedAnd(
   *     (eb) => eb('target.stock', '+', eb.ref('source.stock_delta')),
   *     '>',
   *     0,
   *   )
   *   .thenUpdateSet('stock', (eb) =>
   *     eb('target.stock', '+', eb.ref('source.stock_delta')),
   *   )
   *   .whenMatched()
   *   .thenDelete()
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "wine" as "target"
   * using "wine_stock_change" as "source"
   * on "source"."wine_name" = "target"."name"
   * when not matched and "source"."stock_delta" > $1
   * then insert ("name", "stock") values ("source"."wine_name", "source"."stock_delta")
   * when matched and "target"."stock" + "source"."stock_delta" > $2
   * then update set "stock" = "target"."stock" + "source"."stock_delta"
   * when matched
   * then delete
   * ```
   */
  mergeInto(targetTable) {
    return new MergeQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: MergeQueryNode.create(parseAliasedTable(targetTable), this.#props.withNode)
    });
  }
  /**
   * Creates a `with` query (Common Table Expression).
   *
   * ### Examples
   *
   * <!-- siteExample("cte", "Simple selects", 10) -->
   *
   * Common table expressions (CTE) are a great way to modularize complex queries.
   * Essentially they allow you to run multiple separate queries within a
   * single roundtrip to the DB.
   *
   * Since CTEs are a part of the main query, query optimizers inside DB
   * engines are able to optimize the overall query. For example, postgres
   * is able to inline the CTEs inside the using queries if it decides it's
   * faster.
   *
   * ```ts
   * const result = await db
   *   // Create a CTE called `jennifers` that selects all
   *   // persons named 'Jennifer'.
   *   .with('jennifers', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     .select(['id', 'age'])
   *   )
   *   // Select all rows from the `jennifers` CTE and
   *   // further filter it.
   *   .with('adult_jennifers', (db) => db
   *     .selectFrom('jennifers')
   *     .where('age', '>', 18)
   *     .select(['id', 'age'])
   *   )
   *   // Finally select all adult jennifers that are
   *   // also younger than 60.
   *   .selectFrom('adult_jennifers')
   *   .where('age', '<', 60)
   *   .selectAll()
   *   .execute()
   * ```
   *
   * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
   *
   * Some databases like postgres also allow you to run other queries than selects
   * in CTEs. On these databases CTEs are extremely powerful:
   *
   * ```ts
   * const result = await db
   *   .with('new_person', (db) => db
   *     .insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       age: 35,
   *     })
   *     .returning('id')
   *   )
   *   .with('new_pet', (db) => db
   *     .insertInto('pet')
   *     .values({
   *       name: 'Doggo',
   *       species: 'dog',
   *       is_favorite: true,
   *       // Use the id of the person we just inserted.
   *       owner_id: db
   *         .selectFrom('new_person')
   *         .select('id')
   *     })
   *     .returning('id')
   *   )
   *   .selectFrom(['new_person', 'new_pet'])
   *   .select([
   *     'new_person.id as person_id',
   *     'new_pet.id as pet_id'
   *   ])
   *   .execute()
   * ```
   *
   * The CTE name can optionally specify column names in addition to
   * a name. In that case Kysely requires the expression to retun
   * rows with the same columns.
   *
   * ```ts
   * await db
   *   .with('jennifers(id, age)', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     // This is ok since we return columns with the same
   *     // names as specified by `jennifers(id, age)`.
   *     .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The first argument can also be a callback. The callback is passed
   * a `CTEBuilder` instance that can be used to configure the CTE:
   *
   * ```ts
   * await db
   *   .with(
   *     (cte) => cte('jennifers').materialized(),
   *     (db) => db
   *       .selectFrom('person')
   *       .where('first_name', '=', 'Jennifer')
   *       .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   */
  with(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new _QueryCreator({
      ...this.#props,
      withNode: this.#props.withNode ? WithNode.cloneWithExpression(this.#props.withNode, cte) : WithNode.create(cte)
    });
  }
  /**
   * Creates a recursive `with` query (Common Table Expression).
   *
   * Note that recursiveness is a property of the whole `with` statement.
   * You cannot have recursive and non-recursive CTEs in a same `with` statement.
   * Therefore the recursiveness is determined by the **first** `with` or
   * `withRecusive` call you make.
   *
   * See the {@link with} method for examples and more documentation.
   */
  withRecursive(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new _QueryCreator({
      ...this.#props,
      withNode: this.#props.withNode ? WithNode.cloneWithExpression(this.#props.withNode, cte) : WithNode.create(cte, { recursive: true })
    });
  }
  /**
   * Returns a copy of this query creator instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this query creator instance without any plugins.
   */
  withoutPlugins() {
    return new _QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * Sets the schema to be used for all table references that don't explicitly
   * specify a schema.
   *
   * This only affects the query created through the builder returned from
   * this method and doesn't modify the `db` instance.
   *
   * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
   * for a more detailed explanation.
   *
   * ### Examples
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet')
   *   .selectAll()
   *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select * from "mammals"."pet"
   * inner join "public"."person"
   * on "public"."person"."id" = "mammals"."pet"."owner_id"
   * ```
   *
   * `withSchema` is smart enough to not add schema for aliases,
   * common table expressions or other places where the schema
   * doesn't belong to:
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet as p')
   *   .select('p.name')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p"."name" from "mammals"."pet" as "p"
   * ```
   */
  withSchema(schema) {
    return new _QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
};

// node_modules/kysely/dist/esm/parser/parse-utils.js
function createQueryCreator() {
  return new QueryCreator({
    executor: NOOP_QUERY_EXECUTOR
  });
}
function createJoinBuilder(joinType, table) {
  return new JoinBuilder({
    joinNode: JoinNode.create(joinType, parseTableExpression(table))
  });
}
function createOverBuilder() {
  return new OverBuilder({
    overNode: OverNode.create()
  });
}

// node_modules/kysely/dist/esm/parser/join-parser.js
function parseJoin(joinType, args) {
  if (args.length === 3) {
    return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
  } else if (args.length === 2) {
    return parseCallbackJoin(joinType, args[0], args[1]);
  } else if (args.length === 1) {
    return parseOnlessJoin(joinType, args[0]);
  } else {
    throw new Error("not implemented");
  }
}
function parseCallbackJoin(joinType, from, callback) {
  return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
  return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, "=", rhsColumn));
}
function parseOnlessJoin(joinType, from) {
  return JoinNode.create(joinType, parseTableExpression(from));
}

// node_modules/kysely/dist/esm/operation-node/offset-node.js
var OffsetNode = freeze({
  is(node) {
    return node.kind === "OffsetNode";
  },
  create(offset) {
    return freeze({
      kind: "OffsetNode",
      offset
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/group-by-item-node.js
var GroupByItemNode = freeze({
  is(node) {
    return node.kind === "GroupByItemNode";
  },
  create(groupBy) {
    return freeze({
      kind: "GroupByItemNode",
      groupBy
    });
  }
});

// node_modules/kysely/dist/esm/parser/group-by-parser.js
function parseGroupBy(groupBy) {
  groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
  return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}

// node_modules/kysely/dist/esm/operation-node/set-operation-node.js
var SetOperationNode = freeze({
  is(node) {
    return node.kind === "SetOperationNode";
  },
  create(operator, expression, all) {
    return freeze({
      kind: "SetOperationNode",
      operator,
      expression,
      all
    });
  }
});

// node_modules/kysely/dist/esm/parser/set-operation-parser.js
function parseSetOperations(operator, expression, all) {
  if (isFunction(expression)) {
    expression = expression(createExpressionBuilder());
  }
  if (!isReadonlyArray(expression)) {
    expression = [expression];
  }
  return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}

// node_modules/kysely/dist/esm/expression/expression-wrapper.js
var ExpressionWrapper = class _ExpressionWrapper {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  and(...args) {
    return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `ExpressionWrapper` with a new output type.
   */
  $castTo() {
    return new _ExpressionWrapper(this.#node);
  }
  /**
   * Omit null from the expression's type.
   *
   * This function can be useful in cases where you know an expression can't be
   * null, but Kysely is unable to infer it.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of `this` with a new output type.
   */
  $notNull() {
    return new _ExpressionWrapper(this.#node);
  }
  toOperationNode() {
    return this.#node;
  }
};
var AliasedExpressionWrapper = class {
  #expr;
  #alias;
  constructor(expr, alias) {
    this.#expr = expr;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#expr;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#expr.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
  }
};
var OrWrapper = class _OrWrapper {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new _OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `OrWrapper` with a new output type.
   */
  $castTo() {
    return new _OrWrapper(this.#node);
  }
  toOperationNode() {
    return ParensNode.create(this.#node);
  }
};
var AndWrapper = class _AndWrapper {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  and(...args) {
    return new _AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `AndWrapper` with a new output type.
   */
  $castTo() {
    return new _AndWrapper(this.#node);
  }
  toOperationNode() {
    return ParensNode.create(this.#node);
  }
};

// node_modules/kysely/dist/esm/operation-node/fetch-node.js
var FetchNode = {
  is(node) {
    return node.kind === "FetchNode";
  },
  create(rowCount, modifier) {
    return {
      kind: "FetchNode",
      rowCount: ValueNode.create(rowCount),
      modifier
    };
  }
};

// node_modules/kysely/dist/esm/parser/fetch-parser.js
function parseFetch(rowCount, modifier) {
  if (!isNumber(rowCount) && !isBigInt(rowCount)) {
    throw new Error(`Invalid fetch row count: ${rowCount}`);
  }
  if (!isFetchModifier(modifier)) {
    throw new Error(`Invalid fetch modifier: ${modifier}`);
  }
  return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
  return value === "only" || value === "with ties";
}

// node_modules/kysely/dist/esm/query-builder/select-query-builder.js
var SelectQueryBuilderImpl = class _SelectQueryBuilderImpl {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  get expressionType() {
    return void 0;
  }
  get isSelectQueryBuilder() {
    return true;
  }
  where(...args) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  having(...args) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  havingRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  select(selection) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  distinctOn(selection) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, parseReferenceExpressionOrList(selection))
    });
  }
  modifyFront(modifier) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  modifyEnd(modifier) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  distinct() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.create("Distinct"))
    });
  }
  forUpdate(of) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForUpdate", of ? asArray(of).map(parseTable) : void 0))
    });
  }
  forShare(of) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForShare", of ? asArray(of).map(parseTable) : void 0))
    });
  }
  forKeyShare(of) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForKeyShare", of ? asArray(of).map(parseTable) : void 0))
    });
  }
  forNoKeyUpdate(of) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForNoKeyUpdate", of ? asArray(of).map(parseTable) : void 0))
    });
  }
  skipLocked() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("SkipLocked"))
    });
  }
  noWait() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("NoWait"))
    });
  }
  selectAll(table) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectAll(table))
    });
  }
  innerJoin(...args) {
    return this.#join("InnerJoin", args);
  }
  leftJoin(...args) {
    return this.#join("LeftJoin", args);
  }
  rightJoin(...args) {
    return this.#join("RightJoin", args);
  }
  fullJoin(...args) {
    return this.#join("FullJoin", args);
  }
  crossJoin(...args) {
    return this.#join("CrossJoin", args);
  }
  innerJoinLateral(...args) {
    return this.#join("LateralInnerJoin", args);
  }
  leftJoinLateral(...args) {
    return this.#join("LateralLeftJoin", args);
  }
  crossJoinLateral(...args) {
    return this.#join("LateralCrossJoin", args);
  }
  crossApply(...args) {
    return this.#join("CrossApply", args);
  }
  outerApply(...args) {
    return this.#join("OuterApply", args);
  }
  #join(joinType, args) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args))
    });
  }
  orderBy(...args) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args))
    });
  }
  groupBy(groupBy) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, parseGroupBy(groupBy))
    });
  }
  limit(limit) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  offset(offset) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithOffset(this.#props.queryNode, OffsetNode.create(parseValueExpression(offset)))
    });
  }
  fetch(rowCount, modifier = "only") {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithFetch(this.#props.queryNode, parseFetch(rowCount, modifier))
    });
  }
  top(expression, modifiers) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
    });
  }
  union(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, false))
    });
  }
  unionAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, true))
    });
  }
  intersect(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, false))
    });
  }
  intersectAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, true))
    });
  }
  except(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, false))
    });
  }
  exceptAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, true))
    });
  }
  as(alias) {
    return new AliasedSelectQueryBuilderImpl(this, alias);
  }
  clearSelect() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutSelections(this.#props.queryNode)
    });
  }
  clearWhere() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  clearLimit() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutLimit(this.#props.queryNode)
    });
  }
  clearOffset() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutOffset(this.#props.queryNode)
    });
  }
  clearOrderBy() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode)
    });
  }
  clearGroupBy() {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutGroupBy(this.#props.queryNode)
    });
  }
  $call(func) {
    return func(this);
  }
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _SelectQueryBuilderImpl({
      ...this.#props
    });
  }
  $castTo() {
    return new _SelectQueryBuilderImpl(this.#props);
  }
  $narrowType() {
    return new _SelectQueryBuilderImpl(this.#props);
  }
  $assertType() {
    return new _SelectQueryBuilderImpl(this.#props);
  }
  $asTuple() {
    return new ExpressionWrapper(this.toOperationNode());
  }
  $asScalar() {
    return new ExpressionWrapper(this.toOperationNode());
  }
  withPlugin(plugin) {
    return new _SelectQueryBuilderImpl({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery);
    return result.rows;
  }
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};
function createSelectQueryBuilder(props) {
  return new SelectQueryBuilderImpl(props);
}
var AliasedSelectQueryBuilderImpl = class {
  #queryBuilder;
  #alias;
  constructor(queryBuilder, alias) {
    this.#queryBuilder = queryBuilder;
    this.#alias = alias;
  }
  get expression() {
    return this.#queryBuilder;
  }
  get alias() {
    return this.#alias;
  }
  get isAliasedSelectQueryBuilder() {
    return true;
  }
  toOperationNode() {
    return AliasNode.create(this.#queryBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/operation-node/aggregate-function-node.js
var AggregateFunctionNode = freeze({
  is(node) {
    return node.kind === "AggregateFunctionNode";
  },
  create(aggregateFunction, aggregated = []) {
    return freeze({
      kind: "AggregateFunctionNode",
      func: aggregateFunction,
      aggregated
    });
  },
  cloneWithDistinct(aggregateFunctionNode) {
    return freeze({
      ...aggregateFunctionNode,
      distinct: true
    });
  },
  cloneWithOrderBy(aggregateFunctionNode, orderItems, withinGroup = false) {
    const prop = withinGroup ? "withinGroup" : "orderBy";
    return freeze({
      ...aggregateFunctionNode,
      [prop]: aggregateFunctionNode[prop] ? OrderByNode.cloneWithItems(aggregateFunctionNode[prop], orderItems) : OrderByNode.create(orderItems)
    });
  },
  cloneWithFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOrFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOver(aggregateFunctionNode, over) {
    return freeze({
      ...aggregateFunctionNode,
      over
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/function-node.js
var FunctionNode = freeze({
  is(node) {
    return node.kind === "FunctionNode";
  },
  create(func, args) {
    return freeze({
      kind: "FunctionNode",
      func,
      arguments: args
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/aggregate-function-builder.js
var AggregateFunctionBuilder = class _AggregateFunctionBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  /**
   * Returns an aliased version of the function.
   *
   * In addition to slapping `as "the_alias"` to the end of the SQL,
   * this method also provides strict typing:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.count<number>('id').as('person_count')
   *   )
   *   .executeTakeFirstOrThrow()
   *
   * // `person_count: number` field exists in the result type.
   * console.log(result.person_count)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count("id") as "person_count"
   * from "person"
   * ```
   */
  as(alias) {
    return new AliasedAggregateFunctionBuilder(this, alias);
  }
  /**
   * Adds a `distinct` clause inside the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) =>
   *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
   *   )
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count(distinct "first_name") as "first_name_count"
   * from "person"
   * ```
   */
  distinct() {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode)
    });
  }
  orderBy(...args) {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: QueryNode.cloneWithOrderByItems(this.#props.aggregateFunctionNode, parseOrderBy(args))
    });
  }
  clearOrderBy() {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: QueryNode.cloneWithoutOrderBy(this.#props.aggregateFunctionNode)
    });
  }
  withinGroupOrderBy(...args) {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(this.#props.aggregateFunctionNode, parseOrderBy(args), true)
    });
  }
  filterWhere(...args) {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Adds a `filter` clause with a nested `where` clause after the function, where
   * both sides of the operator are references to columns.
   *
   * Similar to {@link WhereInterface}'s `whereRef` method.
   *
   * ### Examples
   *
   * Count people with same first and last names versus general public:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) => [
   *     eb.fn
   *       .count<number>('id')
   *       .filterWhereRef('first_name', '=', 'last_name')
   *       .as('repeat_name_count'),
   *     eb.fn.count<number>('id').as('total_count'),
   *   ])
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select
   *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
   *   count("id") as "total_count"
   * from "person"
   * ```
   */
  filterWhereRef(lhs, op, rhs) {
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds an `over` clause (window functions) after the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over() as "average_age"
   * from "person"
   * ```
   *
   * Also supports passing a callback that returns an over builder,
   * allowing to add partition by and sort by clauses inside over.
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over(
   *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
   *     ).as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
   * from "person"
   * ```
   */
  over(over) {
    const builder = createOverBuilder();
    return new _AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  /**
   * Casts the expression to the given type.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `AggregateFunctionBuilder` with a new output type.
   */
  $castTo() {
    return new _AggregateFunctionBuilder(this.#props);
  }
  /**
   * Omit null from the expression's type.
   *
   * This function can be useful in cases where you know an expression can't be
   * null, but Kysely is unable to infer it.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of `this` with a new output type.
   */
  $notNull() {
    return new _AggregateFunctionBuilder(this.#props);
  }
  toOperationNode() {
    return this.#props.aggregateFunctionNode;
  }
};
var AliasedAggregateFunctionBuilder = class {
  #aggregateFunctionBuilder;
  #alias;
  constructor(aggregateFunctionBuilder, alias) {
    this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#aggregateFunctionBuilder;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/query-builder/function-module.js
function createFunctionModule() {
  const fn = (name, args) => {
    return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
  };
  const agg = (name, args) => {
    return new AggregateFunctionBuilder({
      aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0)
    });
  };
  return Object.assign(fn, {
    agg,
    avg(column) {
      return agg("avg", [column]);
    },
    coalesce(...values) {
      return fn("coalesce", values);
    },
    count(column) {
      return agg("count", [column]);
    },
    countAll(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table))
      });
    },
    max(column) {
      return agg("max", [column]);
    },
    min(column) {
      return agg("min", [column]);
    },
    sum(column) {
      return agg("sum", [column]);
    },
    any(column) {
      return fn("any", [column]);
    },
    jsonAgg(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("json_agg", [
          isString(table) ? parseTable(table) : table.toOperationNode()
        ])
      });
    },
    toJson(table) {
      return new ExpressionWrapper(FunctionNode.create("to_json", [
        isString(table) ? parseTable(table) : table.toOperationNode()
      ]));
    }
  });
}

// node_modules/kysely/dist/esm/operation-node/unary-operation-node.js
var UnaryOperationNode = freeze({
  is(node) {
    return node.kind === "UnaryOperationNode";
  },
  create(operator, operand) {
    return freeze({
      kind: "UnaryOperationNode",
      operator,
      operand
    });
  }
});

// node_modules/kysely/dist/esm/parser/unary-operation-parser.js
function parseUnaryOperation(operator, operand) {
  return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}

// node_modules/kysely/dist/esm/operation-node/case-node.js
var CaseNode = freeze({
  is(node) {
    return node.kind === "CaseNode";
  },
  create(value) {
    return freeze({
      kind: "CaseNode",
      value
    });
  },
  cloneWithWhen(caseNode, when) {
    return freeze({
      ...caseNode,
      when: freeze(caseNode.when ? [...caseNode.when, when] : [when])
    });
  },
  cloneWithThen(caseNode, then) {
    return freeze({
      ...caseNode,
      when: caseNode.when ? freeze([
        ...caseNode.when.slice(0, -1),
        WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)
      ]) : void 0
    });
  },
  cloneWith(caseNode, props) {
    return freeze({
      ...caseNode,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/case-builder.js
var CaseBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  when(...args) {
    return new CaseThenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
};
var CaseThenBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  then(valueExpression) {
    return new CaseWhenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithThen(this.#props.node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
    });
  }
};
var CaseWhenBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  when(...args) {
    return new CaseThenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
  else(valueExpression) {
    return new CaseEndBuilder({
      ...this.#props,
      node: CaseNode.cloneWith(this.#props.node, {
        else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression)
      })
    });
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
  }
};
var CaseEndBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
  }
};

// node_modules/kysely/dist/esm/operation-node/json-path-leg-node.js
var JSONPathLegNode = freeze({
  is(node) {
    return node.kind === "JSONPathLegNode";
  },
  create(type, value) {
    return freeze({
      kind: "JSONPathLegNode",
      type,
      value
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/json-path-builder.js
var JSONPathBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Access an element of a JSON array in a specific location.
   *
   * Since there's no guarantee an element exists in the given array location, the
   * resulting type is always nullable. If you're sure the element exists, you
   * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
   *
   * See also {@link key} to access properties of JSON objects.
   *
   * ### Examples
   *
   * ```ts
   * await db.selectFrom('person')
   *   .select(eb =>
   *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "nicknames"->0 as "primary_nickname" from "person"
   *```
   *
   * Combined with {@link key}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('experience', '->').at(0).key('role').as('first_role')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "experience"->0->'role' as "first_role" from "person"
   * ```
   *
   * You can use `'last'` to access the last element of the array in MySQL:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `nicknames`->'$[last]' as `last_nickname` from `person`
   * ```
   *
   * Or `'#-1'` in SQLite:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
   * ```
   */
  at(index) {
    return this.#createBuilderWithPathLeg("ArrayLocation", index);
  }
  /**
   * Access a property of a JSON object.
   *
   * If a field is optional, the resulting type will be nullable.
   *
   * See also {@link at} to access elements of JSON arrays.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('address', '->').key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "address"->'city' as "city" from "person"
   * ```
   *
   * Going deeper:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `profile`->'$.website.url' as `website_url` from `person`
   * ```
   *
   * Combined with {@link at}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "profile"->'addresses'->0->'city' as "city" from "person"
   * ```
   */
  key(key) {
    return this.#createBuilderWithPathLeg("Member", key);
  }
  #createBuilderWithPathLeg(legType, value) {
    if (JSONReferenceNode.is(this.#node)) {
      return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(this.#node, JSONPathNode.is(this.#node.traversal) ? JSONPathNode.cloneWithLeg(this.#node.traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(this.#node.traversal, ValueNode.createImmediate(value))));
    }
    return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(this.#node, JSONPathLegNode.create(legType, value)));
  }
};
var TraversedJSONPathBuilder = class _TraversedJSONPathBuilder extends JSONPathBuilder {
  #node;
  constructor(node) {
    super(node);
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedJSONPathBuilder(this, alias);
  }
  /**
   * Change the output type of the json path.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `JSONPathBuilder` with a new output type.
   */
  $castTo() {
    return new _TraversedJSONPathBuilder(this.#node);
  }
  $notNull() {
    return new _TraversedJSONPathBuilder(this.#node);
  }
  toOperationNode() {
    return this.#node;
  }
};
var AliasedJSONPathBuilder = class {
  #jsonPath;
  #alias;
  constructor(jsonPath, alias) {
    this.#jsonPath = jsonPath;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#jsonPath;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#jsonPath.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/operation-node/tuple-node.js
var TupleNode = freeze({
  is(node) {
    return node.kind === "TupleNode";
  },
  create(values) {
    return freeze({
      kind: "TupleNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/data-type-node.js
var SIMPLE_COLUMN_DATA_TYPES = [
  "varchar",
  "char",
  "text",
  "integer",
  "int2",
  "int4",
  "int8",
  "smallint",
  "bigint",
  "boolean",
  "real",
  "double precision",
  "float4",
  "float8",
  "decimal",
  "numeric",
  "binary",
  "bytea",
  "date",
  "datetime",
  "time",
  "timetz",
  "timestamp",
  "timestamptz",
  "serial",
  "bigserial",
  "uuid",
  "json",
  "jsonb",
  "blob",
  "varbinary",
  "int4range",
  "int4multirange",
  "int8range",
  "int8multirange",
  "numrange",
  "nummultirange",
  "tsrange",
  "tsmultirange",
  "tstzrange",
  "tstzmultirange",
  "daterange",
  "datemultirange"
];
var COLUMN_DATA_TYPE_REGEX = [
  /^varchar\(\d+\)$/,
  /^char\(\d+\)$/,
  /^decimal\(\d+, \d+\)$/,
  /^numeric\(\d+, \d+\)$/,
  /^binary\(\d+\)$/,
  /^datetime\(\d+\)$/,
  /^time\(\d+\)$/,
  /^timetz\(\d+\)$/,
  /^timestamp\(\d+\)$/,
  /^timestamptz\(\d+\)$/,
  /^varbinary\(\d+\)$/
];
var DataTypeNode = freeze({
  is(node) {
    return node.kind === "DataTypeNode";
  },
  create(dataType) {
    return freeze({
      kind: "DataTypeNode",
      dataType
    });
  }
});
function isColumnDataType(dataType) {
  if (SIMPLE_COLUMN_DATA_TYPES.includes(dataType)) {
    return true;
  }
  if (COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType))) {
    return true;
  }
  return false;
}

// node_modules/kysely/dist/esm/parser/data-type-parser.js
function parseDataTypeExpression(dataType) {
  if (isOperationNodeSource(dataType)) {
    return dataType.toOperationNode();
  }
  if (isColumnDataType(dataType)) {
    return DataTypeNode.create(dataType);
  }
  throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}

// node_modules/kysely/dist/esm/operation-node/cast-node.js
var CastNode = freeze({
  is(node) {
    return node.kind === "CastNode";
  },
  create(expression, dataType) {
    return freeze({
      kind: "CastNode",
      expression,
      dataType
    });
  }
});

// node_modules/kysely/dist/esm/expression/expression-builder.js
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
  function binary(lhs, op, rhs) {
    return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
  }
  function unary(op, expr) {
    return new ExpressionWrapper(parseUnaryOperation(op, expr));
  }
  const eb = Object.assign(binary, {
    fn: void 0,
    eb: void 0,
    selectFrom(table) {
      return createSelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table))
      });
    },
    case(reference) {
      return new CaseBuilder({
        node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference))
      });
    },
    ref(reference, op) {
      if (isUndefined(op)) {
        return new ExpressionWrapper(parseStringReference(reference));
      }
      return new JSONPathBuilder(parseJSONReference(reference, op));
    },
    jsonPath() {
      return new JSONPathBuilder(JSONPathNode.create());
    },
    table(table) {
      return new ExpressionWrapper(parseTable(table));
    },
    val(value) {
      return new ExpressionWrapper(parseValueExpression(value));
    },
    refTuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
    },
    tuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
    },
    lit(value) {
      return new ExpressionWrapper(parseSafeImmediateValue(value));
    },
    unary,
    not(expr) {
      return unary("not", expr);
    },
    exists(expr) {
      return unary("exists", expr);
    },
    neg(expr) {
      return unary("-", expr);
    },
    between(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    betweenSymmetric(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between symmetric"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    and(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "and"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "and"));
    },
    or(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "or"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "or"));
    },
    parens(...args) {
      const node = parseValueBinaryOperationOrExpression(args);
      if (ParensNode.is(node)) {
        return new ExpressionWrapper(node);
      } else {
        return new ExpressionWrapper(ParensNode.create(node));
      }
    },
    cast(expr, dataType) {
      return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
    },
    withSchema(schema) {
      return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
  });
  eb.fn = createFunctionModule();
  eb.eb = eb;
  return eb;
}
function expressionBuilder(_) {
  return createExpressionBuilder();
}

// node_modules/kysely/dist/esm/parser/expression-parser.js
function parseExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
  return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}

// node_modules/kysely/dist/esm/dynamic/dynamic-table-builder.js
var DynamicTableBuilder = class {
  #table;
  get table() {
    return this.#table;
  }
  constructor(table) {
    this.#table = table;
  }
  as(alias) {
    return new AliasedDynamicTableBuilder(this.#table, alias);
  }
};
var AliasedDynamicTableBuilder = class {
  #table;
  #alias;
  get table() {
    return this.#table;
  }
  get alias() {
    return this.#alias;
  }
  constructor(table, alias) {
    this.#table = table;
    this.#alias = alias;
  }
  toOperationNode() {
    return AliasNode.create(parseTable(this.#table), IdentifierNode.create(this.#alias));
  }
};
function isAliasedDynamicTableBuilder(obj) {
  return isObject(obj) && isOperationNodeSource(obj) && isString(obj.table) && isString(obj.alias);
}

// node_modules/kysely/dist/esm/parser/table-parser.js
function parseTableExpressionOrList(table) {
  if (isReadonlyArray(table)) {
    return table.map((it) => parseTableExpression(it));
  } else {
    return [parseTableExpression(table)];
  }
}
function parseTableExpression(table) {
  if (isString(table)) {
    return parseAliasedTable(table);
  } else if (isAliasedDynamicTableBuilder(table)) {
    return table.toOperationNode();
  } else {
    return parseAliasedExpression(table);
  }
}
function parseAliasedTable(from) {
  const ALIAS_SEPARATOR = " as ";
  if (from.includes(ALIAS_SEPARATOR)) {
    const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim2);
    return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
  } else {
    return parseTable(from);
  }
}
function parseTable(from) {
  const SCHEMA_SEPARATOR = ".";
  if (from.includes(SCHEMA_SEPARATOR)) {
    const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim2);
    return TableNode.createWithSchema(schema, table);
  } else {
    return TableNode.create(from);
  }
}
function trim2(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/operation-node/add-column-node.js
var AddColumnNode = freeze({
  is(node) {
    return node.kind === "AddColumnNode";
  },
  create(column) {
    return freeze({
      kind: "AddColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/column-definition-node.js
var ColumnDefinitionNode = freeze({
  is(node) {
    return node.kind === "ColumnDefinitionNode";
  },
  create(column, dataType) {
    return freeze({
      kind: "ColumnDefinitionNode",
      column: ColumnNode.create(column),
      dataType
    });
  },
  cloneWithFrontModifier(node, modifier) {
    return freeze({
      ...node,
      frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : [modifier]
    });
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : [modifier]
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-column-node.js
var DropColumnNode = freeze({
  is(node) {
    return node.kind === "DropColumnNode";
  },
  create(column) {
    return freeze({
      kind: "DropColumnNode",
      column: ColumnNode.create(column)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/rename-column-node.js
var RenameColumnNode = freeze({
  is(node) {
    return node.kind === "RenameColumnNode";
  },
  create(column, newColumn) {
    return freeze({
      kind: "RenameColumnNode",
      column: ColumnNode.create(column),
      renameTo: ColumnNode.create(newColumn)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/check-constraint-node.js
var CheckConstraintNode = freeze({
  is(node) {
    return node.kind === "CheckConstraintNode";
  },
  create(expression, constraintName) {
    return freeze({
      kind: "CheckConstraintNode",
      expression,
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/references-node.js
var ON_MODIFY_FOREIGN_ACTIONS = [
  "no action",
  "restrict",
  "cascade",
  "set null",
  "set default"
];
var ReferencesNode = freeze({
  is(node) {
    return node.kind === "ReferencesNode";
  },
  create(table, columns) {
    return freeze({
      kind: "ReferencesNode",
      table,
      columns: freeze([...columns])
    });
  },
  cloneWithOnDelete(references, onDelete) {
    return freeze({
      ...references,
      onDelete
    });
  },
  cloneWithOnUpdate(references, onUpdate) {
    return freeze({
      ...references,
      onUpdate
    });
  }
});

// node_modules/kysely/dist/esm/parser/default-value-parser.js
function parseDefaultValueExpression(value) {
  return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}

// node_modules/kysely/dist/esm/operation-node/generated-node.js
var GeneratedNode = freeze({
  is(node) {
    return node.kind === "GeneratedNode";
  },
  create(params) {
    return freeze({
      kind: "GeneratedNode",
      ...params
    });
  },
  createWithExpression(expression) {
    return freeze({
      kind: "GeneratedNode",
      always: true,
      expression
    });
  },
  cloneWith(node, params) {
    return freeze({
      ...node,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/default-value-node.js
var DefaultValueNode = freeze({
  is(node) {
    return node.kind === "DefaultValueNode";
  },
  create(defaultValue) {
    return freeze({
      kind: "DefaultValueNode",
      defaultValue
    });
  }
});

// node_modules/kysely/dist/esm/parser/on-modify-action-parser.js
function parseOnModifyForeignAction(action) {
  if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnModifyForeignAction ${action}`);
}

// node_modules/kysely/dist/esm/schema/column-definition-builder.js
var ColumnDefinitionBuilder = class _ColumnDefinitionBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key auto_increment
   * )
   * ```
   */
  autoIncrement() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
  }
  /**
   * Makes the column an identity column.
   *
   * This only works on some dialects like MS SQL Server (MSSQL).
   *
   * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.identity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MSSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer identity primary key
   * )
   * ```
   */
  identity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { identity: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key
   * )
   */
  primaryKey() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
  }
  /**
   * Adds a foreign key constraint for the column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id")
   * )
   * ```
   */
  references(ref) {
    const references = parseStringReference(ref);
    if (!references.table || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.create(references.table, [
        references.column
      ])
    }));
  }
  /**
   * Adds an `on delete` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on delete cascade
   * )
   * ```
   */
  onDelete(onDelete) {
    if (!this.#node.references) {
      throw new Error("on delete constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnDelete(this.#node.references, parseOnModifyForeignAction(onDelete))
    }));
  }
  /**
   * Adds an `on update` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onUpdate('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on update cascade
   * )
   * ```
   */
  onUpdate(onUpdate) {
    if (!this.#node.references) {
      throw new Error("on update constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnUpdate(this.#node.references, parseOnModifyForeignAction(onUpdate))
    }));
  }
  /**
   * Adds a unique constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `email` varchar(255) unique
   * )
   * ```
   */
  unique() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `first_name` varchar(255) not null
   * )
   * ```
   */
  notNull() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('age', 'integer', col => col.unsigned())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `age` integer unsigned
   * )
   * ```
   */
  unsigned() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
  }
  /**
   * Adds a default value constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer default 4
   * )
   * ```
   *
   * Values passed to `defaultTo` are interpreted as value literals by default. You can define
   * an arbitrary SQL expression using the {@link sql} template tag:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'created_at',
   *     'timestamp',
   *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `created_at` timestamp default CURRENT_TIMESTAMP
   * )
   * ```
   */
  defaultTo(value) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value))
    }));
  }
  /**
   * Adds a check constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) =>
   *     col.check(sql`number_of_legs < 5`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer check (number_of_legs < 5)
   * )
   * ```
   */
  check(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      check: CheckConstraintNode.create(expression.toOperationNode())
    }));
  }
  /**
   * Makes the column a generated column using a `generated always as` statement.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)',
   *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
   * )
   * ```
   */
  generatedAlwaysAs(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated always as identity primary key
   * )
   * ```
   */
  generatedAlwaysAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated by default as identity primary key
   * )
   * ```
   */
  generatedByDefaultAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, byDefault: true })
    }));
  }
  /**
   * Makes a generated column stored instead of virtual. This method can only
   * be used with {@link generatedAlwaysAs}
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)', (col) => col
   *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *     .stored()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
   * )
   * ```
   */
  stored() {
    if (!this.#node.generated) {
      throw new Error("stored() can only be called after generatedAlwaysAs");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.cloneWith(this.#node.generated, {
        stored: true
      })
    }));
  }
  /**
   * This can be used to add any additional SQL right after the column's data type.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'first_name',
   *     'varchar(36)',
   *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(36) collate utf8mb4_general_ci not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * Adds `nulls not distinct` specifier.
   * Should be used with `unique` constraint.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(30) unique nulls not distinct
   * )
   * ```
   */
  nullsNotDistinct() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { nullsNotDistinct: true }));
  }
  /**
   * Adds `if not exists` specifier. This only works for PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * alter table "person" add column if not exists "email" varchar(255) unique
   * ```
   */
  ifNotExists() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { ifNotExists: true }));
  }
  /**
   * This can be used to add any additional SQL to the end of the column definition.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'age',
   *     'integer',
   *     col => col.unsigned()
   *       .notNull()
   *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
   * )
   * ```
   */
  modifyEnd(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/esm/operation-node/modify-column-node.js
var ModifyColumnNode = freeze({
  is(node) {
    return node.kind === "ModifyColumnNode";
  },
  create(column) {
    return freeze({
      kind: "ModifyColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/foreign-key-constraint-node.js
var ForeignKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "ForeignKeyConstraintNode";
  },
  create(sourceColumns, targetTable, targetColumns, constraintName) {
    return freeze({
      kind: "ForeignKeyConstraintNode",
      columns: sourceColumns,
      references: ReferencesNode.create(targetTable, targetColumns),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js
var ForeignKeyConstraintBuilder = class _ForeignKeyConstraintBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  onDelete(onDelete) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onDelete: parseOnModifyForeignAction(onDelete)
    }));
  }
  onUpdate(onUpdate) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onUpdate: parseOnModifyForeignAction(onUpdate)
    }));
  }
  deferrable() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/esm/operation-node/add-constraint-node.js
var AddConstraintNode = freeze({
  is(node) {
    return node.kind === "AddConstraintNode";
  },
  create(constraint) {
    return freeze({
      kind: "AddConstraintNode",
      constraint
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/unique-constraint-node.js
var UniqueConstraintNode = freeze({
  is(node) {
    return node.kind === "UniqueConstraintNode";
  },
  create(columns, constraintName, nullsNotDistinct) {
    return freeze({
      kind: "UniqueConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0,
      nullsNotDistinct
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-constraint-node.js
var DropConstraintNode = freeze({
  is(node) {
    return node.kind === "DropConstraintNode";
  },
  create(constraintName) {
    return freeze({
      kind: "DropConstraintNode",
      constraintName: IdentifierNode.create(constraintName)
    });
  },
  cloneWith(dropConstraint, props) {
    return freeze({
      ...dropConstraint,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/alter-column-node.js
var AlterColumnNode = freeze({
  is(node) {
    return node.kind === "AlterColumnNode";
  },
  create(column, prop, value) {
    return freeze({
      kind: "AlterColumnNode",
      column: ColumnNode.create(column),
      [prop]: value
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-column-builder.js
var AlterColumnBuilder = class {
  #column;
  constructor(column) {
    this.#column = column;
  }
  setDataType(dataType) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dataType", parseDataTypeExpression(dataType)));
  }
  setDefault(value) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setDefault", parseDefaultValueExpression(value)));
  }
  dropDefault() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropDefault", true));
  }
  setNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setNotNull", true));
  }
  dropNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropNotNull", true));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
var AlteredColumnBuilder = class {
  #alterColumnNode;
  constructor(alterColumnNode) {
    this.#alterColumnNode = alterColumnNode;
  }
  toOperationNode() {
    return this.#alterColumnNode;
  }
};

// node_modules/kysely/dist/esm/schema/alter-table-executor.js
var AlterTableExecutor = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/alter-table-add-foreign-key-constraint-builder.js
var AlterTableAddForeignKeyConstraintBuilder = class _AlterTableAddForeignKeyConstraintBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  onDelete(onDelete) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate)
    });
  }
  deferrable() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.deferrable()
    });
  }
  notDeferrable() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.notDeferrable()
    });
  }
  initiallyDeferred() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.initiallyDeferred()
    });
  }
  initiallyImmediate() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.initiallyImmediate()
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(AlterTableNode.cloneWithTableProps(this.#props.node, {
      addConstraint: AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode())
    }), this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/alter-table-drop-constraint-builder.js
var AlterTableDropConstraintBuilder = class _AlterTableDropConstraintBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "restrict"
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/operation-node/primary-key-constraint-node.js
var PrimaryKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "PrimaryKeyConstraintNode";
  },
  create(columns, constraintName) {
    return freeze({
      kind: "PrimaryKeyConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({ ...node, ...props });
  }
});

// node_modules/kysely/dist/esm/operation-node/add-index-node.js
var AddIndexNode = freeze({
  is(node) {
    return node.kind === "AddIndexNode";
  },
  create(name) {
    return freeze({
      kind: "AddIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-table-add-index-builder.js
var AlterTableAddIndexBuilder = class _AlterTableAddIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Makes the index unique.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .unique()
   *   .column('email')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_first_name_index` (`email`)
   * ```
   */
  unique() {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
          unique: true
        })
      })
    });
  }
  /**
   * Adds a column to the index.
   *
   * Also see {@link columns} for adding multiple columns at once or {@link expression}
   * for specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_and_age_index')
   *   .column('first_name')
   *   .column('age desc')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
   * ```
   */
  column(column) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
          parseOrderedColumnName(column)
        ])
      })
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_and_age_index')
   *   .columns(['first_name', 'age desc'])
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
   * ```
   */
  columns(columns) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, columns.map(parseOrderedColumnName))
      })
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .expression(sql<boolean>`(first_name < 'Sami')`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
   * ```
   */
  expression(expression) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
          expression.toOperationNode()
        ])
      })
    });
  }
  using(indexType) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
          using: RawNode.createWithSql(indexType)
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/unique-constraint-builder.js
var UniqueConstraintNodeBuilder = class _UniqueConstraintNodeBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Adds `nulls not distinct` to the unique constraint definition
   *
   * Supported by PostgreSQL dialect only
   */
  nullsNotDistinct() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
  }
  deferrable() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/esm/schema/primary-key-constraint-builder.js
var PrimaryKeyConstraintBuilder = class _PrimaryKeyConstraintBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  deferrable() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/esm/schema/check-constraint-builder.js
var CheckConstraintBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/esm/operation-node/rename-constraint-node.js
var RenameConstraintNode = freeze({
  is(node) {
    return node.kind === "RenameConstraintNode";
  },
  create(oldName, newName) {
    return freeze({
      kind: "RenameConstraintNode",
      oldName: IdentifierNode.create(oldName),
      newName: IdentifierNode.create(newName)
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-table-builder.js
var AlterTableBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        renameTo: parseTable(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode())
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression, build = noop) {
    const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode())
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addForeignKeyConstraint}
   *
   * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
   * the constraint builder and doesn't take a callback as the last argument. This
   * is because you can only add one column per `ALTER TABLE` query.
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const constraintBuilder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder
    });
  }
  /**
   * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
   */
  addPrimaryKeyConstraint(constraintName, columns, build = noop) {
    const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode())
      })
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.create(constraintName)
      })
    });
  }
  renameConstraint(oldName, newName) {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        renameConstraint: RenameConstraintNode.create(oldName, newName)
      })
    });
  }
  /**
   * This can be used to add index to table.
   *
   *  ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .addIndex('person_email_index')
   *   .column('email')
   *   .unique()
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_email_index` (`email`)
   * ```
   */
  addIndex(indexName) {
    return new AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.create(indexName)
      })
    });
  }
  /**
   * This can be used to drop index from table.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .dropIndex('person_email_index')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` drop index `test_first_name_index`
   * ```
   */
  dropIndex(indexName) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropIndex: DropIndexNode.create(indexName)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * See {@link CreateTableBuilder.$call}
   */
  $call(func) {
    return func(this);
  }
};
var AlterTableColumnAlteringBuilder = class _AlterTableColumnAlteringBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-transformer.js
var ImmediateValueTransformer = class extends OperationNodeTransformer {
  transformPrimitiveValueList(node) {
    return ValueListNode.create(node.values.map(ValueNode.createImmediate));
  }
  transformValue(node) {
    return ValueNode.createImmediate(node.value);
  }
};

// node_modules/kysely/dist/esm/schema/create-index-builder.js
var CreateIndexBuilder = class _CreateIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        unique: true
      })
    });
  }
  /**
   * Adds `nulls not distinct` specifier to index.
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createIndex('person_first_name_index')
   *  .on('person')
   *  .column('first_name')
   *  .nullsNotDistinct()
   *  .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index"
   * on "test" ("first_name")
   * nulls not distinct;
   * ```
   */
  nullsNotDistinct() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        nullsNotDistinct: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  /**
   * Adds a column to the index.
   *
   * Also see {@link columns} for adding multiple columns at once or {@link expression}
   * for specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .column('first_name')
   *         .column('age desc')
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  column(column) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        parseOrderedColumnName(column)
      ])
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .columns(['first_name', 'age desc'])
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  columns(columns) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, columns.map(parseOrderedColumnName))
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createIndex('person_first_name_index')
   *   .on('person')
   *   .expression(sql`first_name COLLATE "fi_FI"`)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
   * ```
   */
  expression(expression) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new _CreateIndexBuilder({
      ...this.#props,
      node: QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode(parseValueBinaryOperationOrExpression(args), this.#props.queryId))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/create-schema-builder.js
var CreateSchemaBuilder = class _CreateSchemaBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifNotExists() {
    return new _CreateSchemaBuilder({
      ...this.#props,
      node: CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/parser/on-commit-action-parse.js
function parseOnCommitAction(action) {
  if (ON_COMMIT_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnCommitAction ${action}`);
}

// node_modules/kysely/dist/esm/schema/create-table-builder.js
var CreateTableBuilder = class _CreateTableBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  /**
   * Adds an "on commit" statement.
   *
   * This can be used in conjunction with temporary tables on supported databases
   * like PostgreSQL.
   */
  onCommit(onCommit) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        onCommit: parseOnCommitAction(onCommit)
      })
    });
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the table already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Adds a column to the table.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
   *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
   *   .addColumn('last_name', 'varchar(255)')
   *   .addColumn('bank_balance', 'numeric(8, 2)')
   *   // You can specify any data type using the `sql` tag if the types
   *   // don't include it.
   *   .addColumn('data', sql`any_type_here`)
   *   .addColumn('parent_id', 'integer', (col) =>
   *     col.references('person.id').onDelete('cascade')
   *   )
   * ```
   *
   * With this method, it's once again good to remember that Kysely just builds the
   * query and doesn't provide the same API for all databases. For example, some
   * databases like older MySQL don't support the `references` statement in the
   * column definition. Instead foreign key constraints need to be defined in the
   * `create table` query. See the next example:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.primaryKey())
   *   .addColumn('parent_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'person_parent_id_fk',
   *     ['parent_id'],
   *     'person',
   *     ['id'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * Another good example is that PostgreSQL doesn't support the `auto_increment`
   * keyword and you need to define an autoincrementing column for example using
   * `serial`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'serial', (col) => col.primaryKey())
   *   .execute()
   * ```
   */
  addColumn(columnName, dataType, build = noop) {
    const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode())
    });
  }
  /**
   * Adds a primary key constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  addPrimaryKeyConstraint(constraintName, columns, build = noop) {
    const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a unique constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name']
   *   )
   *   .execute()
   * ```
   *
   * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name'],
   *     (cb) => cb.nullsNotDistinct()
   *   )
   *   .execute()
   * ```
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a check constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('animal')
   *   .addColumn('number_of_legs', 'integer')
   *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
   *   .execute()
   * ```
   */
  addCheckConstraint(constraintName, checkExpression, build = noop) {
    const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a foreign key constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id'],
   *     'person',
   *     ['id'],
   *   )
   *   .execute()
   * ```
   *
   * Add constraint for multiple columns:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id1', 'integer')
   *   .addColumn('owner_id2', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id1', 'owner_id2'],
   *     'person',
   *     ['id1', 'id2'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
   *
   * Also see {@link temporary}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .modifyFront(sql`global temporary`)
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (Postgres):
   *
   * ```sql
   * create global temporary table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(64) not null,
   *   "last_name" varchar(64) not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * Also see {@link onCommit}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .modifyEnd(sql`collate utf8_unicode_ci`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(64) not null,
   *   `last_name` varchar(64) not null
   * ) collate utf8_unicode_ci
   * ```
   */
  modifyEnd(modifier) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * Allows to create table from `select` query.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('copy')
   *   .temporary()
   *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create temporary table "copy" as
   * select "first_name", "last_name" from "person"
   * ```
   */
  as(expression) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        selectQuery: parseExpression(expression)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('test')
   *   .$call((builder) => builder.addColumn('id', 'integer'))
   *   .execute()
   * ```
   *
   * This is useful for creating reusable functions that can be called with a builder.
   *
   * ```ts
   * import { type CreateTableBuilder, sql } from 'kysely'
   *
   * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
   *   return ctb
   *     .addColumn('id', 'integer', (col) => col.notNull())
   *     .addColumn('created_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   *     .addColumn('updated_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   * }
   *
   * await db.schema
   *   .createTable('test')
   *   .$call(addDefaultColumns)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/drop-index-builder.js
var DropIndexBuilder = class _DropIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  ifExists() {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/drop-schema-builder.js
var DropSchemaBuilder = class _DropSchemaBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/drop-table-builder.js
var DropTableBuilder = class _DropTableBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/operation-node/create-view-node.js
var CreateViewNode = freeze({
  is(node) {
    return node.kind === "CreateViewNode";
  },
  create(name) {
    return freeze({
      kind: "CreateViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(createView2, params) {
    return freeze({
      ...createView2,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-plugin.js
var ImmediateValuePlugin = class {
  #transformer = new ImmediateValueTransformer();
  transformQuery(args) {
    return this.#transformer.transformNode(args.node, args.queryId);
  }
  transformResult(args) {
    return Promise.resolve(args.result);
  }
};

// node_modules/kysely/dist/esm/schema/create-view-builder.js
var CreateViewBuilder = class _CreateViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        columns: columns.map(parseColumnName)
      })
    });
  }
  /**
   * Sets the select query or a `values` statement that creates the view.
   *
   * WARNING!
   * Some dialects don't support parameterized queries in DDL statements and therefore
   * the query or raw {@link sql } expression passed here is interpolated into a single
   * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
   * into the query or raw expression passed to this method!
   */
  as(query) {
    const queryNode = query.withPlugin(new ImmediateValuePlugin()).toOperationNode();
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        as: queryNode
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/operation-node/drop-view-node.js
var DropViewNode = freeze({
  is(node) {
    return node.kind === "DropViewNode";
  },
  create(name) {
    return freeze({
      kind: "DropViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(dropView, params) {
    return freeze({
      ...dropView,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/schema/drop-view-builder.js
var DropViewBuilder = class _DropViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  materialized() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/operation-node/create-type-node.js
var CreateTypeNode = freeze({
  is(node) {
    return node.kind === "CreateTypeNode";
  },
  create(name) {
    return freeze({
      kind: "CreateTypeNode",
      name
    });
  },
  cloneWithEnum(createType, values) {
    return freeze({
      ...createType,
      enum: ValueListNode.create(values.map(ValueNode.createImmediate))
    });
  }
});

// node_modules/kysely/dist/esm/schema/create-type-builder.js
var CreateTypeBuilder = class _CreateTypeBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  /**
   * Creates an anum type.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
   * ```
   */
  asEnum(values) {
    return new _CreateTypeBuilder({
      ...this.#props,
      node: CreateTypeNode.cloneWithEnum(this.#props.node, values)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/operation-node/drop-type-node.js
var DropTypeNode = freeze({
  is(node) {
    return node.kind === "DropTypeNode";
  },
  create(name) {
    return freeze({
      kind: "DropTypeNode",
      name
    });
  },
  cloneWith(dropType, params) {
    return freeze({
      ...dropType,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/schema/drop-type-builder.js
var DropTypeBuilder = class _DropTypeBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _DropTypeBuilder({
      ...this.#props,
      node: DropTypeNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/parser/identifier-parser.js
function parseSchemableIdentifier(id) {
  const SCHEMA_SEPARATOR = ".";
  if (id.includes(SCHEMA_SEPARATOR)) {
    const parts = id.split(SCHEMA_SEPARATOR).map(trim3);
    if (parts.length === 2) {
      return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
    } else {
      throw new Error(`invalid schemable identifier ${id}`);
    }
  } else {
    return SchemableIdentifierNode.create(id);
  }
}
function trim3(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/operation-node/refresh-materialized-view-node.js
var RefreshMaterializedViewNode = freeze({
  is(node) {
    return node.kind === "RefreshMaterializedViewNode";
  },
  create(name) {
    return freeze({
      kind: "RefreshMaterializedViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(createView2, params) {
    return freeze({
      ...createView2,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/schema/refresh-materialized-view-builder.js
var RefreshMaterializedViewBuilder = class _RefreshMaterializedViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "concurrently" modifier.
   *
   * Use this to refresh the view without locking out concurrent selects on the materialized view.
   *
   * WARNING!
   * This cannot be used with the "with no data" modifier.
   */
  concurrently() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        concurrently: true,
        withNoData: false
      })
    });
  }
  /**
   * Adds the "with data" modifier.
   *
   * If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
   */
  withData() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        withNoData: false
      })
    });
  }
  /**
   * Adds the "with no data" modifier.
   *
   * If specified, no new data is generated and the materialized view is left in an unscannable state.
   *
   * WARNING!
   * This cannot be used with the "concurrently" modifier.
   */
  withNoData() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        withNoData: true,
        concurrently: false
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile());
  }
};

// node_modules/kysely/dist/esm/schema/schema.js
var SchemaModule = class _SchemaModule {
  #executor;
  constructor(executor) {
    this.#executor = executor;
  }
  /**
   * Create a new table.
   *
   * ### Examples
   *
   * This example creates a new table with columns `id`, `first_name`,
   * `last_name` and `gender`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('first_name', 'varchar', col => col.notNull())
   *   .addColumn('last_name', 'varchar', col => col.notNull())
   *   .addColumn('gender', 'varchar')
   *   .execute()
   * ```
   *
   * This example creates a table with a foreign key. Not all database
   * engines support column-level foreign key constraint definitions.
   * For example if you are using MySQL 5.X see the next example after
   * this one.
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer', col => col
   *     .references('person.id')
   *     .onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * This example adds a foreign key constraint for a columns just
   * like the previous example, but using a table-level statement.
   * On MySQL 5.X you need to define foreign key constraints like
   * this:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
   *     (constraint) => constraint.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  createTable(table) {
    return new CreateTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTableNode.create(parseTable(table))
    });
  }
  /**
   * Drop a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropTable('person')
   *   .execute()
   * ```
   */
  dropTable(table) {
    return new DropTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createIndex('person_full_name_unique_index')
   *   .on('person')
   *   .columns(['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  createIndex(indexName) {
    return new CreateIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateIndexNode.create(indexName)
    });
  }
  /**
   * Drop an index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropIndex('person_full_name_unique_index')
   *   .execute()
   * ```
   */
  dropIndex(indexName) {
    return new DropIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropIndexNode.create(indexName)
    });
  }
  /**
   * Create a new schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createSchema('some_schema')
   *   .execute()
   * ```
   */
  createSchema(schema) {
    return new CreateSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateSchemaNode.create(schema)
    });
  }
  /**
   * Drop a schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropSchema('some_schema')
   *   .execute()
   * ```
   */
  dropSchema(schema) {
    return new DropSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropSchemaNode.create(schema)
    });
  }
  /**
   * Alter a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
   *   .execute()
   * ```
   */
  alterTable(table) {
    return new AlterTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: AlterTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createView('dogs')
   *   .orReplace()
   *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
   *   .execute()
   * ```
   */
  createView(viewName) {
    return new CreateViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateViewNode.create(viewName)
    });
  }
  /**
   * Refresh a materialized view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .refreshMaterializedView('my_view')
   *   .concurrently()
   *   .execute()
   * ```
   */
  refreshMaterializedView(viewName) {
    return new RefreshMaterializedViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: RefreshMaterializedViewNode.create(viewName)
    });
  }
  /**
   * Drop a view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropView('dogs')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropView(viewName) {
    return new DropViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropViewNode.create(viewName)
    });
  }
  /**
   * Create a new type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createType('species')
   *   .asEnum(['dog', 'cat', 'frog'])
   *   .execute()
   * ```
   */
  createType(typeName) {
    return new CreateTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Drop a type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropType('species')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropType(typeName) {
    return new DropTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Returns a copy of this schema module with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _SchemaModule(this.#executor.withPlugin(plugin));
  }
  /**
   * Returns a copy of this schema module  without any plugins.
   */
  withoutPlugins() {
    return new _SchemaModule(this.#executor.withoutPlugins());
  }
  /**
   * See {@link QueryCreator.withSchema}
   */
  withSchema(schema) {
    return new _SchemaModule(this.#executor.withPluginAtFront(new WithSchemaPlugin(schema)));
  }
};

// node_modules/kysely/dist/esm/dynamic/dynamic.js
var DynamicModule = class {
  /**
   * Creates a dynamic reference to a column that is not know at compile time.
   *
   * Kysely is built in a way that by default you can't refer to tables or columns
   * that are not actually visible in the current query and context. This is all
   * done by TypeScript at compile time, which means that you need to know the
   * columns and tables at compile time. This is not always the case of course.
   *
   * This method is meant to be used in those cases where the column names
   * come from the user input or are not otherwise known at compile time.
   *
   * WARNING! Unlike values, column names are not escaped by the database engine
   * or Kysely and if you pass in unchecked column names using this method, you
   * create an SQL injection vulnerability. Always __always__ validate the user
   * input before passing it to this method.
   *
   * There are couple of examples below for some use cases, but you can pass
   * `ref` to other methods as well. If the types allow you to pass a `ref`
   * value to some place, it should work.
   *
   * ### Examples
   *
   * Filter by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(filterColumn: string, filterValue: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .selectAll()
   *     .where(ref(filterColumn), '=', filterValue)
   *     .execute()
   * }
   *
   * someQuery('first_name', 'Arnold')
   * someQuery('person.last_name', 'Aniston')
   * ```
   *
   * Order by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(orderBy: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .select('person.first_name as fn')
   *     .orderBy(ref(orderBy))
   *     .execute()
   * }
   *
   * someQuery('fn')
   * ```
   *
   * In this example we add selections dynamically:
   *
   * ```ts
   * const { ref } = db.dynamic
   *
   * // Some column name provided by the user. Value not known at compile time.
   * const columnFromUserInput: PossibleColumns = 'birthdate';
   *
   * // A type that lists all possible values `columnFromUserInput` can have.
   * // You can use `keyof Person` if any column of an interface is allowed.
   * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
   *
   * const [person] = await db.selectFrom('person')
   *   .select([
   *     ref<PossibleColumns>(columnFromUserInput),
   *     'id'
   *   ])
   *   .execute()
   *
   * // The resulting type contains all `PossibleColumns` as optional fields
   * // because we cannot know which field was actually selected before
   * // running the code.
   * const lastName: string | null | undefined = person?.last_name
   * const firstName: string | undefined = person?.first_name
   * const birthDate: Date | null | undefined = person?.birthdate
   *
   * // The result type also contains the compile time selection `id`.
   * person?.id
   * ```
   */
  ref(reference) {
    return new DynamicReferenceBuilder(reference);
  }
  /**
   * Creates a table reference to a table that's not fully known at compile time.
   *
   * The type `T` is allowed to be a union of multiple tables.
   *
   * <!-- siteExample("select", "Generic find query", 130) -->
   *
   * A generic type-safe helper function for finding a row by a column value:
   *
   * ```ts
   * import { SelectType } from 'kysely'
   * import { Database } from 'type-editor'
   *
   * async function getRowByColumn<
   *   T extends keyof Database,
   *   C extends keyof Database[T] & string,
   *   V extends SelectType<Database[T][C]>,
   * >(t: T, c: C, v: V) {
   *   // We need to use the dynamic module since the table name
   *   // is not known at compile time.
   *   const { table, ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom(table(t).as('t'))
   *     .selectAll()
   *     .where(ref(c), '=', v)
   *     .orderBy('t.id')
   *     .executeTakeFirstOrThrow()
   * }
   *
   * const person = await getRowByColumn('person', 'first_name', 'Arnold')
   * ```
   */
  table(table) {
    return new DynamicTableBuilder(table);
  }
};

// node_modules/kysely/dist/esm/driver/default-connection-provider.js
var DefaultConnectionProvider = class {
  #driver;
  constructor(driver) {
    this.#driver = driver;
  }
  async provideConnection(consumer) {
    const connection = await this.#driver.acquireConnection();
    try {
      return await consumer(connection);
    } finally {
      await this.#driver.releaseConnection(connection);
    }
  }
};

// node_modules/kysely/dist/esm/query-executor/default-query-executor.js
var DefaultQueryExecutor = class _DefaultQueryExecutor extends QueryExecutorBase {
  #compiler;
  #adapter;
  #connectionProvider;
  constructor(compiler, adapter, connectionProvider, plugins = []) {
    super(plugins);
    this.#compiler = compiler;
    this.#adapter = adapter;
    this.#connectionProvider = connectionProvider;
  }
  get adapter() {
    return this.#adapter;
  }
  compileQuery(node, queryId) {
    return this.#compiler.compileQuery(node, queryId);
  }
  provideConnection(consumer) {
    return this.#connectionProvider.provideConnection(consumer);
  }
  withPlugins(plugins) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
  }
  withPlugin(plugin) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
  }
  withPluginAtFront(plugin) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
  }
  withConnectionProvider(connectionProvider) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
  }
  withoutPlugins() {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
  }
};

// node_modules/kysely/dist/esm/util/performance-now.js
function performanceNow() {
  if (typeof performance !== "undefined" && isFunction(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}

// node_modules/kysely/dist/esm/driver/runtime-driver.js
var RuntimeDriver = class {
  #driver;
  #log;
  #initPromise;
  #initDone;
  #destroyPromise;
  #connections = /* @__PURE__ */ new WeakSet();
  constructor(driver, log) {
    this.#initDone = false;
    this.#driver = driver;
    this.#log = log;
  }
  async init() {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    if (!this.#initPromise) {
      this.#initPromise = this.#driver.init().then(() => {
        this.#initDone = true;
      }).catch((err) => {
        this.#initPromise = void 0;
        return Promise.reject(err);
      });
    }
    await this.#initPromise;
  }
  async acquireConnection() {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    if (!this.#initDone) {
      await this.init();
    }
    const connection = await this.#driver.acquireConnection();
    if (!this.#connections.has(connection)) {
      if (this.#needsLogging()) {
        this.#addLogging(connection);
      }
      this.#connections.add(connection);
    }
    return connection;
  }
  async releaseConnection(connection) {
    await this.#driver.releaseConnection(connection);
  }
  beginTransaction(connection, settings) {
    return this.#driver.beginTransaction(connection, settings);
  }
  commitTransaction(connection) {
    return this.#driver.commitTransaction(connection);
  }
  rollbackTransaction(connection) {
    return this.#driver.rollbackTransaction(connection);
  }
  savepoint(connection, savepointName, compileQuery) {
    if (this.#driver.savepoint) {
      return this.#driver.savepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `savepoint` method is not supported by this driver");
  }
  rollbackToSavepoint(connection, savepointName, compileQuery) {
    if (this.#driver.rollbackToSavepoint) {
      return this.#driver.rollbackToSavepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `rollbackToSavepoint` method is not supported by this driver");
  }
  releaseSavepoint(connection, savepointName, compileQuery) {
    if (this.#driver.releaseSavepoint) {
      return this.#driver.releaseSavepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `releaseSavepoint` method is not supported by this driver");
  }
  async destroy() {
    if (!this.#initPromise) {
      return;
    }
    await this.#initPromise;
    if (!this.#destroyPromise) {
      this.#destroyPromise = this.#driver.destroy().catch((err) => {
        this.#destroyPromise = void 0;
        return Promise.reject(err);
      });
    }
    await this.#destroyPromise;
  }
  #needsLogging() {
    return this.#log.isLevelEnabled("query") || this.#log.isLevelEnabled("error");
  }
  // This method monkey patches the database connection's executeQuery method
  // by adding logging code around it. Monkey patching is not pretty, but it's
  // the best option in this case.
  #addLogging(connection) {
    const executeQuery = connection.executeQuery;
    const streamQuery = connection.streamQuery;
    const dis = this;
    connection.executeQuery = async (compiledQuery) => {
      let caughtError;
      const startTime = performanceNow();
      try {
        return await executeQuery.call(connection, compiledQuery);
      } catch (error) {
        caughtError = error;
        await dis.#logError(error, compiledQuery, startTime);
        throw error;
      } finally {
        if (!caughtError) {
          await dis.#logQuery(compiledQuery, startTime);
        }
      }
    };
    connection.streamQuery = async function* (compiledQuery, chunkSize) {
      let caughtError;
      const startTime = performanceNow();
      try {
        for await (const result of streamQuery.call(connection, compiledQuery, chunkSize)) {
          yield result;
        }
      } catch (error) {
        caughtError = error;
        await dis.#logError(error, compiledQuery, startTime);
        throw error;
      } finally {
        if (!caughtError) {
          await dis.#logQuery(compiledQuery, startTime, true);
        }
      }
    };
  }
  async #logError(error, compiledQuery, startTime) {
    await this.#log.error(() => ({
      level: "error",
      error,
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  async #logQuery(compiledQuery, startTime, isStream = false) {
    await this.#log.query(() => ({
      level: "query",
      isStream,
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  #calculateDurationMillis(startTime) {
    return performanceNow() - startTime;
  }
};

// node_modules/kysely/dist/esm/driver/single-connection-provider.js
var ignoreError = () => {
};
var SingleConnectionProvider = class {
  #connection;
  #runningPromise;
  constructor(connection) {
    this.#connection = connection;
  }
  async provideConnection(consumer) {
    while (this.#runningPromise) {
      await this.#runningPromise.catch(ignoreError);
    }
    this.#runningPromise = this.#run(consumer).finally(() => {
      this.#runningPromise = void 0;
    });
    return this.#runningPromise;
  }
  // Run the runner in an async function to make sure it doesn't
  // throw synchronous errors.
  async #run(runner) {
    return await runner(this.#connection);
  }
};

// node_modules/kysely/dist/esm/driver/driver.js
var TRANSACTION_ACCESS_MODES = ["read only", "read write"];
var TRANSACTION_ISOLATION_LEVELS = [
  "read uncommitted",
  "read committed",
  "repeatable read",
  "serializable",
  "snapshot"
];
function validateTransactionSettings(settings) {
  if (settings.accessMode && !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) {
    throw new Error(`invalid transaction access mode ${settings.accessMode}`);
  }
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}

// node_modules/kysely/dist/esm/util/log.js
var LOG_LEVELS = freeze(["query", "error"]);
var Log = class {
  #levels;
  #logger;
  constructor(config) {
    if (isFunction(config)) {
      this.#logger = config;
      this.#levels = freeze({
        query: true,
        error: true
      });
    } else {
      this.#logger = defaultLogger;
      this.#levels = freeze({
        query: config.includes("query"),
        error: config.includes("error")
      });
    }
  }
  isLevelEnabled(level) {
    return this.#levels[level];
  }
  async query(getEvent) {
    if (this.#levels.query) {
      await this.#logger(getEvent());
    }
  }
  async error(getEvent) {
    if (this.#levels.error) {
      await this.#logger(getEvent());
    }
  }
};
function defaultLogger(event) {
  if (event.level === "query") {
    const prefix = `kysely:query:${event.isStream ? "stream:" : ""}`;
    console.log(`${prefix} ${event.query.sql}`);
    console.log(`${prefix} duration: ${event.queryDurationMillis.toFixed(1)}ms`);
  } else if (event.level === "error") {
    if (event.error instanceof Error) {
      console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
    } else {
      console.error(`kysely:error: ${JSON.stringify({
        error: event.error,
        query: event.query.sql,
        queryDurationMillis: event.queryDurationMillis
      })}`);
    }
  }
}

// node_modules/kysely/dist/esm/util/compilable.js
function isCompilable(value) {
  return isObject(value) && isFunction(value.compile);
}

// node_modules/kysely/dist/esm/kysely.js
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
var Kysely = class _Kysely extends QueryCreator {
  #props;
  constructor(args) {
    let superProps;
    let props;
    if (isKyselyProps(args)) {
      superProps = { executor: args.executor };
      props = { ...args };
    } else {
      const dialect2 = args.dialect;
      const driver = dialect2.createDriver();
      const compiler = dialect2.createQueryCompiler();
      const adapter = dialect2.createAdapter();
      const log = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, log);
      const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
      const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
      superProps = { executor };
      props = {
        config: args,
        executor,
        dialect: dialect2,
        driver: runtimeDriver
      };
    }
    super(superProps);
    this.#props = freeze(props);
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(this.#props.executor);
  }
  /**
   * Returns a the {@link DynamicModule} module.
   *
   * The {@link DynamicModule} module can be used to bypass strict typing and
   * passing in dynamic values for the queries.
   */
  get dynamic() {
    return new DynamicModule();
  }
  /**
   * Returns a {@link DatabaseIntrospector | database introspector}.
   */
  get introspection() {
    return this.#props.dialect.createIntrospector(this.withoutPlugins());
  }
  case(value) {
    return new CaseBuilder({
      node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
    });
  }
  /**
   * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
   * calls.
   *
   * ```ts
   * const { count } = db.fn
   *
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select([
   *     'id',
   *     count('pet.id').as('person_count'),
   *   ])
   *   .groupBy('person.id')
   *   .having(count('pet.id'), '>', 10)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", count("pet"."id") as "person_count"
   * from "person"
   * inner join "pet" on "pet"."owner_id" = "person"."id"
   * group by "person"."id"
   * having count("pet"."id") > $1
   * ```
   *
   * Why "somewhat" type-safe? Because the function calls are not bound to the
   * current query context. They allow you to reference columns and tables that
   * are not in the current query. E.g. remove the `innerJoin` from the previous
   * query and TypeScript won't even complain.
   *
   * If you want to make the function calls fully type-safe, you can use the
   * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
   *
   * ```ts
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select((eb) => [
   *     'person.id',
   *     eb.fn.count('pet.id').as('pet_count')
   *   ])
   *   .groupBy('person.id')
   *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
   *   .execute()
   * ```
   */
  get fn() {
    return createFunctionModule();
  }
  /**
   * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
   *
   * The returned {@link TransactionBuilder} can be used to configure the transaction. The
   * {@link TransactionBuilder.execute} method can then be called to run the transaction.
   * {@link TransactionBuilder.execute} takes a function that is run inside the
   * transaction. If the function throws an exception,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * The callback function passed to the {@link TransactionBuilder.execute | execute}
   * method gets the transaction object as its only argument. The transaction is
   * of type {@link Transaction} which inherits {@link Kysely}. Any query
   * started through the transaction object is executed inside the transaction.
   *
   * To run a controlled transaction, allowing you to commit and rollback manually,
   * use {@link startTransaction} instead.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Simple transaction", 10) -->
   *
   * This example inserts two rows in a transaction. If an exception is thrown inside
   * the callback passed to the `execute` method,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * ```ts
   * const catto = await db.transaction().execute(async (trx) => {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   return await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirst()
   * })
   * ```
   *
   * Setting the isolation level:
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   *
   * await db
   *   .transaction()
   *   .setIsolationLevel('serializable')
   *   .execute(async (trx) => {
   *     await doStuff(trx)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  transaction() {
    return new TransactionBuilder({ ...this.#props });
  }
  /**
   * Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
   *
   * The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
   * The {@link ControlledTransactionBuilder.execute} method can then be called
   * to start the transaction and return a {@link ControlledTransaction}.
   *
   * A {@link ControlledTransaction} allows you to commit and rollback manually,
   * execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
   * so you can run queries inside the transaction. Once the transaction is committed,
   * or rolled back, it can't be used anymore - all queries will throw an error.
   * This is to prevent accidentally running queries outside the transaction - where
   * atomicity is not guaranteed anymore.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Controlled transaction", 11) -->
   *
   * A controlled transaction allows you to commit and rollback manually, execute
   * savepoint commands, and queries in general.
   *
   * In this example we start a transaction, use it to insert two rows and then commit
   * the transaction. If an error is thrown, we catch it and rollback the transaction.
   *
   * ```ts
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   const catto = await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirstOrThrow()
   *
   *   await trx.commit().execute()
   *
   *   // ...
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   * ```
   *
   * <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
   *
   * A controlled transaction allows you to commit and rollback manually, execute
   * savepoint commands, and queries in general.
   *
   * In this example we start a transaction, insert a person, create a savepoint,
   * try inserting a toy and a pet, and if an error is thrown, we rollback to the
   * savepoint. Eventually we release the savepoint, insert an audit record and
   * commit the transaction. If an error is thrown, we catch it and rollback the
   * transaction.
   *
   * ```ts
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   const jennifer = await trx
   *     .insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   *   try {
   *     const catto = await trxAfterJennifer
   *       .insertInto('pet')
   *       .values({
   *         owner_id: jennifer.id,
   *         name: 'Catto',
   *         species: 'cat',
   *       })
   *       .returning('id')
   *       .executeTakeFirstOrThrow()
   *
   *     await trxAfterJennifer
   *       .insertInto('toy')
   *       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
   *       .execute()
   *   } catch (error) {
   *     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   *   }
   *
   *   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
   *
   *   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   * ```
   */
  startTransaction() {
    return new ControlledTransactionBuilder({ ...this.#props });
  }
  /**
   * Provides a kysely instance bound to a single database connection.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .connection()
   *   .execute(async (db) => {
   *     // `db` is an instance of `Kysely` that's bound to a single
   *     // database connection. All queries executed through `db` use
   *     // the same connection.
   *     await doStuff(db)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  connection() {
    return new ConnectionBuilder({ ...this.#props });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  /**
   * Returns a copy of this Kysely instance with tables added to its
   * database type.
   *
   * This method only modifies the types and doesn't affect any of the
   * executed queries in any way.
   *
   * ### Examples
   *
   * The following example adds and uses a temporary table:
   *
   * ```ts
   * await db.schema
   *   .createTable('temp_table')
   *   .temporary()
   *   .addColumn('some_column', 'integer')
   *   .execute()
   *
   * const tempDb = db.withTables<{
   *   temp_table: {
   *     some_column: number
   *   }
   * }>()
   *
   * await tempDb
   *   .insertInto('temp_table')
   *   .values({ some_column: 100 })
   *   .execute()
   * ```
   */
  withTables() {
    return new _Kysely({ ...this.#props });
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * You need to call this when you are done using the `Kysely` instance.
   */
  async destroy() {
    await this.#props.driver.destroy();
  }
  /**
   * Returns true if this `Kysely` instance is a transaction.
   *
   * You can also use `db instanceof Transaction`.
   */
  get isTransaction() {
    return false;
  }
  /**
   * @internal
   * @private
   */
  getExecutor() {
    return this.#props.executor;
  }
  /**
   * Executes a given compiled query or query builder.
   *
   * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
   */
  executeQuery(query, queryId) {
    if (queryId !== void 0) {
      logOnce("Passing `queryId` in `db.executeQuery` is deprecated and will result in a compile-time error in the future.");
    }
    const compiledQuery = isCompilable(query) ? query.compile() : query;
    return this.getExecutor().executeQuery(compiledQuery);
  }
  async [Symbol.asyncDispose]() {
    await this.destroy();
  }
};
var Transaction = class _Transaction extends Kysely {
  #props;
  constructor(props) {
    super(props);
    this.#props = props;
  }
  // The return type is `true` instead of `boolean` to make Kysely<DB>
  // unassignable to Transaction<DB> while allowing assignment the
  // other way around.
  get isTransaction() {
    return true;
  }
  transaction() {
    throw new Error("calling the transaction method for a Transaction is not supported");
  }
  connection() {
    throw new Error("calling the connection method for a Transaction is not supported");
  }
  async destroy() {
    throw new Error("calling the destroy method for a Transaction is not supported");
  }
  withPlugin(plugin) {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  withSchema(schema) {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _Transaction({ ...this.#props });
  }
};
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
var ConnectionBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  async execute(callback) {
    return this.#props.executor.provideConnection(async (connection) => {
      const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db2 = new Kysely({
        ...this.#props,
        executor
      });
      return await callback(db2);
    });
  }
};
var TransactionBuilder = class _TransactionBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  setAccessMode(accessMode) {
    return new _TransactionBuilder({
      ...this.#props,
      accessMode
    });
  }
  setIsolationLevel(isolationLevel) {
    return new _TransactionBuilder({
      ...this.#props,
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, accessMode, ...kyselyProps } = this.#props;
    const settings = { isolationLevel, accessMode };
    validateTransactionSettings(settings);
    return this.#props.executor.provideConnection(async (connection) => {
      const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const transaction = new Transaction({
        ...kyselyProps,
        executor
      });
      let transactionBegun = false;
      try {
        await this.#props.driver.beginTransaction(connection, settings);
        transactionBegun = true;
        const result = await callback(transaction);
        await this.#props.driver.commitTransaction(connection);
        return result;
      } catch (error) {
        if (transactionBegun) {
          await this.#props.driver.rollbackTransaction(connection);
        }
        throw error;
      }
    });
  }
};
var ControlledTransactionBuilder = class _ControlledTransactionBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  setAccessMode(accessMode) {
    return new _ControlledTransactionBuilder({
      ...this.#props,
      accessMode
    });
  }
  setIsolationLevel(isolationLevel) {
    return new _ControlledTransactionBuilder({
      ...this.#props,
      isolationLevel
    });
  }
  async execute() {
    const { isolationLevel, accessMode, ...props } = this.#props;
    const settings = { isolationLevel, accessMode };
    validateTransactionSettings(settings);
    const connection = await provideControlledConnection(this.#props.executor);
    await this.#props.driver.beginTransaction(connection.connection, settings);
    return new ControlledTransaction({
      ...props,
      connection,
      executor: this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection.connection))
    });
  }
};
var ControlledTransaction = class _ControlledTransaction extends Transaction {
  #props;
  #compileQuery;
  #state;
  constructor(props) {
    const state = { isCommitted: false, isRolledBack: false };
    props = {
      ...props,
      executor: new NotCommittedOrRolledBackAssertingExecutor(props.executor, state)
    };
    const { connection, ...transactionProps } = props;
    super(transactionProps);
    this.#props = freeze(props);
    this.#state = state;
    const queryId = createQueryId();
    this.#compileQuery = (node) => props.executor.compileQuery(node, queryId);
  }
  get isCommitted() {
    return this.#state.isCommitted;
  }
  get isRolledBack() {
    return this.#state.isRolledBack;
  }
  /**
   * Commits the transaction.
   *
   * See {@link rollback}.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   await doSomething(trx)
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   *
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  commit() {
    assertNotCommittedOrRolledBack(this.#state);
    return new Command(async () => {
      await this.#props.driver.commitTransaction(this.#props.connection.connection);
      this.#state.isCommitted = true;
      this.#props.connection.release();
    });
  }
  /**
   * Rolls back the transaction.
   *
   * See {@link commit} and {@link rollbackToSavepoint}.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   await doSomething(trx)
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   *
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  rollback() {
    assertNotCommittedOrRolledBack(this.#state);
    return new Command(async () => {
      await this.#props.driver.rollbackTransaction(this.#props.connection.connection);
      this.#state.isRolledBack = true;
      this.#props.connection.release();
    });
  }
  /**
   * Creates a savepoint with a given name.
   *
   * See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
   *
   * For a type-safe experience, you should use the returned instance from now on.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  savepoint(savepointName) {
    assertNotCommittedOrRolledBack(this.#state);
    return new Command(async () => {
      await this.#props.driver.savepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  /**
   * Rolls back to a savepoint with a given name.
   *
   * See {@link savepoint} and {@link releaseSavepoint}.
   *
   * You must use the same instance returned by {@link savepoint}, or
   * escape the type-check by using `as any`.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  rollbackToSavepoint(savepointName) {
    assertNotCommittedOrRolledBack(this.#state);
    return new Command(async () => {
      await this.#props.driver.rollbackToSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  /**
   * Releases a savepoint with a given name.
   *
   * See {@link savepoint} and {@link rollbackToSavepoint}.
   *
   * You must use the same instance returned by {@link savepoint}, or
   * escape the type-check by using `as any`.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
   *
   * await doSomethingElse(trx)
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * async function doSomethingElse(kysely: Kysely<Database>) {}
   * ```
   */
  releaseSavepoint(savepointName) {
    assertNotCommittedOrRolledBack(this.#state);
    return new Command(async () => {
      await this.#props.driver.releaseSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  withPlugin(plugin) {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  withSchema(schema) {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _ControlledTransaction({ ...this.#props });
  }
};
var Command = class {
  #cb;
  constructor(cb) {
    this.#cb = cb;
  }
  /**
   * Executes the command.
   */
  async execute() {
    return await this.#cb();
  }
};
function assertNotCommittedOrRolledBack(state) {
  if (state.isCommitted) {
    throw new Error("Transaction is already committed");
  }
  if (state.isRolledBack) {
    throw new Error("Transaction is already rolled back");
  }
}
var NotCommittedOrRolledBackAssertingExecutor = class _NotCommittedOrRolledBackAssertingExecutor {
  #executor;
  #state;
  constructor(executor, state) {
    if (executor instanceof _NotCommittedOrRolledBackAssertingExecutor) {
      this.#executor = executor.#executor;
    } else {
      this.#executor = executor;
    }
    this.#state = state;
  }
  get adapter() {
    return this.#executor.adapter;
  }
  get plugins() {
    return this.#executor.plugins;
  }
  transformQuery(node, queryId) {
    return this.#executor.transformQuery(node, queryId);
  }
  compileQuery(node, queryId) {
    return this.#executor.compileQuery(node, queryId);
  }
  provideConnection(consumer) {
    return this.#executor.provideConnection(consumer);
  }
  executeQuery(compiledQuery) {
    assertNotCommittedOrRolledBack(this.#state);
    return this.#executor.executeQuery(compiledQuery);
  }
  stream(compiledQuery, chunkSize) {
    assertNotCommittedOrRolledBack(this.#state);
    return this.#executor.stream(compiledQuery, chunkSize);
  }
  withConnectionProvider(connectionProvider) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withConnectionProvider(connectionProvider), this.#state);
  }
  withPlugin(plugin) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugin(plugin), this.#state);
  }
  withPlugins(plugins) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugins(plugins), this.#state);
  }
  withPluginAtFront(plugin) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPluginAtFront(plugin), this.#state);
  }
  withoutPlugins() {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withoutPlugins(), this.#state);
  }
};

// node_modules/kysely/dist/esm/raw-builder/raw-builder.js
var RawBuilderImpl = class _RawBuilderImpl {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  get expressionType() {
    return void 0;
  }
  get isRawBuilder() {
    return true;
  }
  as(alias) {
    return new AliasedRawBuilderImpl(this, alias);
  }
  $castTo() {
    return new _RawBuilderImpl({ ...this.#props });
  }
  $notNull() {
    return new _RawBuilderImpl(this.#props);
  }
  withPlugin(plugin) {
    return new _RawBuilderImpl({
      ...this.#props,
      plugins: this.#props.plugins !== void 0 ? freeze([...this.#props.plugins, plugin]) : freeze([plugin])
    });
  }
  toOperationNode() {
    return this.#toOperationNode(this.#getExecutor());
  }
  compile(executorProvider) {
    return this.#compile(this.#getExecutor(executorProvider));
  }
  async execute(executorProvider) {
    const executor = this.#getExecutor(executorProvider);
    return executor.executeQuery(this.#compile(executor));
  }
  #getExecutor(executorProvider) {
    const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
    return this.#props.plugins !== void 0 ? executor.withPlugins(this.#props.plugins) : executor;
  }
  #toOperationNode(executor) {
    return executor.transformQuery(this.#props.rawNode, this.#props.queryId);
  }
  #compile(executor) {
    return executor.compileQuery(this.#toOperationNode(executor), this.#props.queryId);
  }
};
function createRawBuilder(props) {
  return new RawBuilderImpl(props);
}
var AliasedRawBuilderImpl = class {
  #rawBuilder;
  #alias;
  constructor(rawBuilder, alias) {
    this.#rawBuilder = rawBuilder;
    this.#alias = alias;
  }
  get expression() {
    return this.#rawBuilder;
  }
  get alias() {
    return this.#alias;
  }
  get rawBuilder() {
    return this.#rawBuilder;
  }
  toOperationNode() {
    return AliasNode.create(this.#rawBuilder.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/raw-builder/sql.js
var sql = Object.assign((sqlFragments, ...parameters) => {
  return createRawBuilder({
    queryId: createQueryId(),
    rawNode: RawNode.create(sqlFragments, parameters?.map(parseParameter) ?? [])
  });
}, {
  ref(columnReference) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseStringReference(columnReference))
    });
  },
  val(value) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseValueExpression(value))
    });
  },
  value(value) {
    return this.val(value);
  },
  table(tableReference) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseTable(tableReference))
    });
  },
  id(...ids) {
    const fragments = new Array(ids.length + 1).fill(".");
    fragments[0] = "";
    fragments[fragments.length - 1] = "";
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create))
    });
  },
  lit(value) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(ValueNode.createImmediate(value))
    });
  },
  literal(value) {
    return this.lit(value);
  },
  raw(sql2) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithSql(sql2)
    });
  },
  join(array, separator = sql`, `) {
    const nodes = new Array(Math.max(2 * array.length - 1, 0));
    const sep = separator.toOperationNode();
    for (let i = 0; i < array.length; ++i) {
      nodes[2 * i] = parseParameter(array[i]);
      if (i !== array.length - 1) {
        nodes[2 * i + 1] = sep;
      }
    }
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChildren(nodes)
    });
  }
});
function parseParameter(param) {
  if (isOperationNodeSource(param)) {
    return param.toOperationNode();
  }
  return parseValueExpression(param);
}

// node_modules/kysely/dist/esm/operation-node/operation-node-visitor.js
var OperationNodeVisitor = class {
  nodeStack = [];
  get parentNode() {
    return this.nodeStack[this.nodeStack.length - 2];
  }
  #visitors = freeze({
    AliasNode: this.visitAlias.bind(this),
    ColumnNode: this.visitColumn.bind(this),
    IdentifierNode: this.visitIdentifier.bind(this),
    SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this),
    RawNode: this.visitRaw.bind(this),
    ReferenceNode: this.visitReference.bind(this),
    SelectQueryNode: this.visitSelectQuery.bind(this),
    SelectionNode: this.visitSelection.bind(this),
    TableNode: this.visitTable.bind(this),
    FromNode: this.visitFrom.bind(this),
    SelectAllNode: this.visitSelectAll.bind(this),
    AndNode: this.visitAnd.bind(this),
    OrNode: this.visitOr.bind(this),
    ValueNode: this.visitValue.bind(this),
    ValueListNode: this.visitValueList.bind(this),
    PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this),
    ParensNode: this.visitParens.bind(this),
    JoinNode: this.visitJoin.bind(this),
    OperatorNode: this.visitOperator.bind(this),
    WhereNode: this.visitWhere.bind(this),
    InsertQueryNode: this.visitInsertQuery.bind(this),
    DeleteQueryNode: this.visitDeleteQuery.bind(this),
    ReturningNode: this.visitReturning.bind(this),
    CreateTableNode: this.visitCreateTable.bind(this),
    AddColumnNode: this.visitAddColumn.bind(this),
    ColumnDefinitionNode: this.visitColumnDefinition.bind(this),
    DropTableNode: this.visitDropTable.bind(this),
    DataTypeNode: this.visitDataType.bind(this),
    OrderByNode: this.visitOrderBy.bind(this),
    OrderByItemNode: this.visitOrderByItem.bind(this),
    GroupByNode: this.visitGroupBy.bind(this),
    GroupByItemNode: this.visitGroupByItem.bind(this),
    UpdateQueryNode: this.visitUpdateQuery.bind(this),
    ColumnUpdateNode: this.visitColumnUpdate.bind(this),
    LimitNode: this.visitLimit.bind(this),
    OffsetNode: this.visitOffset.bind(this),
    OnConflictNode: this.visitOnConflict.bind(this),
    OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this),
    CreateIndexNode: this.visitCreateIndex.bind(this),
    DropIndexNode: this.visitDropIndex.bind(this),
    ListNode: this.visitList.bind(this),
    PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this),
    UniqueConstraintNode: this.visitUniqueConstraint.bind(this),
    ReferencesNode: this.visitReferences.bind(this),
    CheckConstraintNode: this.visitCheckConstraint.bind(this),
    WithNode: this.visitWith.bind(this),
    CommonTableExpressionNode: this.visitCommonTableExpression.bind(this),
    CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this),
    HavingNode: this.visitHaving.bind(this),
    CreateSchemaNode: this.visitCreateSchema.bind(this),
    DropSchemaNode: this.visitDropSchema.bind(this),
    AlterTableNode: this.visitAlterTable.bind(this),
    DropColumnNode: this.visitDropColumn.bind(this),
    RenameColumnNode: this.visitRenameColumn.bind(this),
    AlterColumnNode: this.visitAlterColumn.bind(this),
    ModifyColumnNode: this.visitModifyColumn.bind(this),
    AddConstraintNode: this.visitAddConstraint.bind(this),
    DropConstraintNode: this.visitDropConstraint.bind(this),
    RenameConstraintNode: this.visitRenameConstraint.bind(this),
    ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
    CreateViewNode: this.visitCreateView.bind(this),
    RefreshMaterializedViewNode: this.visitRefreshMaterializedView.bind(this),
    DropViewNode: this.visitDropView.bind(this),
    GeneratedNode: this.visitGenerated.bind(this),
    DefaultValueNode: this.visitDefaultValue.bind(this),
    OnNode: this.visitOn.bind(this),
    ValuesNode: this.visitValues.bind(this),
    SelectModifierNode: this.visitSelectModifier.bind(this),
    CreateTypeNode: this.visitCreateType.bind(this),
    DropTypeNode: this.visitDropType.bind(this),
    ExplainNode: this.visitExplain.bind(this),
    DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this),
    AggregateFunctionNode: this.visitAggregateFunction.bind(this),
    OverNode: this.visitOver.bind(this),
    PartitionByNode: this.visitPartitionBy.bind(this),
    PartitionByItemNode: this.visitPartitionByItem.bind(this),
    SetOperationNode: this.visitSetOperation.bind(this),
    BinaryOperationNode: this.visitBinaryOperation.bind(this),
    UnaryOperationNode: this.visitUnaryOperation.bind(this),
    UsingNode: this.visitUsing.bind(this),
    FunctionNode: this.visitFunction.bind(this),
    CaseNode: this.visitCase.bind(this),
    WhenNode: this.visitWhen.bind(this),
    JSONReferenceNode: this.visitJSONReference.bind(this),
    JSONPathNode: this.visitJSONPath.bind(this),
    JSONPathLegNode: this.visitJSONPathLeg.bind(this),
    JSONOperatorChainNode: this.visitJSONOperatorChain.bind(this),
    TupleNode: this.visitTuple.bind(this),
    MergeQueryNode: this.visitMergeQuery.bind(this),
    MatchedNode: this.visitMatched.bind(this),
    AddIndexNode: this.visitAddIndex.bind(this),
    CastNode: this.visitCast.bind(this),
    FetchNode: this.visitFetch.bind(this),
    TopNode: this.visitTop.bind(this),
    OutputNode: this.visitOutput.bind(this),
    OrActionNode: this.visitOrAction.bind(this),
    CollateNode: this.visitCollate.bind(this)
  });
  visitNode = (node) => {
    this.nodeStack.push(node);
    this.#visitors[node.kind](node);
    this.nodeStack.pop();
  };
};

// node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js
var LIT_WRAP_REGEX = /'/g;
var DefaultQueryCompiler = class extends OperationNodeVisitor {
  #sql = "";
  #parameters = [];
  get numParameters() {
    return this.#parameters.length;
  }
  compileQuery(node, queryId) {
    this.#sql = "";
    this.#parameters = [];
    this.nodeStack.splice(0, this.nodeStack.length);
    this.visitNode(node);
    return freeze({
      query: node,
      queryId,
      sql: this.getSql(),
      parameters: [...this.#parameters]
    });
  }
  getSql() {
    return this.#sql;
  }
  visitSelectQuery(node) {
    const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !InsertQueryNode.is(this.parentNode) && !CreateTableNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
    if (this.parentNode === void 0 && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (wrapInParens) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("select");
    if (node.distinctOn) {
      this.append(" ");
      this.compileDistinctOn(node.distinctOn);
    }
    if (node.frontModifiers?.length) {
      this.append(" ");
      this.compileList(node.frontModifiers, " ");
    }
    if (node.top) {
      this.append(" ");
      this.visitNode(node.top);
    }
    if (node.selections) {
      this.append(" ");
      this.compileList(node.selections);
    }
    if (node.from) {
      this.append(" ");
      this.visitNode(node.from);
    }
    if (node.joins) {
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.groupBy) {
      this.append(" ");
      this.visitNode(node.groupBy);
    }
    if (node.having) {
      this.append(" ");
      this.visitNode(node.having);
    }
    if (node.setOperations) {
      this.append(" ");
      this.compileList(node.setOperations, " ");
    }
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.offset) {
      this.append(" ");
      this.visitNode(node.offset);
    }
    if (node.fetch) {
      this.append(" ");
      this.visitNode(node.fetch);
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(this.sortSelectModifiers([...node.endModifiers]), " ");
    }
    if (wrapInParens) {
      this.append(")");
    }
  }
  visitFrom(node) {
    this.append("from ");
    this.compileList(node.froms);
  }
  visitSelection(node) {
    this.visitNode(node.selection);
  }
  visitColumn(node) {
    this.visitNode(node.column);
  }
  compileDistinctOn(expressions) {
    this.append("distinct on (");
    this.compileList(expressions);
    this.append(")");
  }
  compileList(nodes, separator = ", ") {
    const lastIndex = nodes.length - 1;
    for (let i = 0; i <= lastIndex; i++) {
      this.visitNode(nodes[i]);
      if (i < lastIndex) {
        this.append(separator);
      }
    }
  }
  visitWhere(node) {
    this.append("where ");
    this.visitNode(node.where);
  }
  visitHaving(node) {
    this.append("having ");
    this.visitNode(node.having);
  }
  visitInsertQuery(node) {
    const rootQueryNode = this.nodeStack.find(QueryNode.is);
    const isSubQuery = rootQueryNode !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append(node.replace ? "replace" : "insert");
    if (node.ignore) {
      logOnce("`InsertQueryNode.ignore` is deprecated. Use `InsertQueryNode.orAction` instead.");
      this.append(" ignore");
    }
    if (node.orAction) {
      this.append(" ");
      this.visitNode(node.orAction);
    }
    if (node.top) {
      this.append(" ");
      this.visitNode(node.top);
    }
    if (node.into) {
      this.append(" into ");
      this.visitNode(node.into);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.values) {
      this.append(" ");
      this.visitNode(node.values);
    }
    if (node.defaultValues) {
      this.append(" ");
      this.append("default values");
    }
    if (node.onConflict) {
      this.append(" ");
      this.visitNode(node.onConflict);
    }
    if (node.onDuplicateKey) {
      this.append(" ");
      this.visitNode(node.onDuplicateKey);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitValues(node) {
    this.append("values ");
    this.compileList(node.values);
  }
  visitDeleteQuery(node) {
    const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("delete ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    this.visitNode(node.from);
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.using) {
      this.append(" ");
      this.visitNode(node.using);
    }
    if (node.joins) {
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitReturning(node) {
    this.append("returning ");
    this.compileList(node.selections);
  }
  visitAlias(node) {
    this.visitNode(node.node);
    this.append(" as ");
    this.visitNode(node.alias);
  }
  visitReference(node) {
    if (node.table) {
      this.visitNode(node.table);
      this.append(".");
    }
    this.visitNode(node.column);
  }
  visitSelectAll(_) {
    this.append("*");
  }
  visitIdentifier(node) {
    this.append(this.getLeftIdentifierWrapper());
    this.compileUnwrappedIdentifier(node);
    this.append(this.getRightIdentifierWrapper());
  }
  compileUnwrappedIdentifier(node) {
    if (!isString(node.name)) {
      throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
    }
    this.append(this.sanitizeIdentifier(node.name));
  }
  visitAnd(node) {
    this.visitNode(node.left);
    this.append(" and ");
    this.visitNode(node.right);
  }
  visitOr(node) {
    this.visitNode(node.left);
    this.append(" or ");
    this.visitNode(node.right);
  }
  visitValue(node) {
    if (node.immediate) {
      this.appendImmediateValue(node.value);
    } else {
      this.appendValue(node.value);
    }
  }
  visitValueList(node) {
    this.append("(");
    this.compileList(node.values);
    this.append(")");
  }
  visitTuple(node) {
    this.append("(");
    this.compileList(node.values);
    this.append(")");
  }
  visitPrimitiveValueList(node) {
    this.append("(");
    const { values } = node;
    for (let i = 0; i < values.length; ++i) {
      this.appendValue(values[i]);
      if (i !== values.length - 1) {
        this.append(", ");
      }
    }
    this.append(")");
  }
  visitParens(node) {
    this.append("(");
    this.visitNode(node.node);
    this.append(")");
  }
  visitJoin(node) {
    this.append(JOIN_TYPE_SQL[node.joinType]);
    this.append(" ");
    this.visitNode(node.table);
    if (node.on) {
      this.append(" ");
      this.visitNode(node.on);
    }
  }
  visitOn(node) {
    this.append("on ");
    this.visitNode(node.on);
  }
  visitRaw(node) {
    const { sqlFragments, parameters: params } = node;
    for (let i = 0; i < sqlFragments.length; ++i) {
      this.append(sqlFragments[i]);
      if (params.length > i) {
        this.visitNode(params[i]);
      }
    }
  }
  visitOperator(node) {
    this.append(node.operator);
  }
  visitTable(node) {
    this.visitNode(node.table);
  }
  visitSchemableIdentifier(node) {
    if (node.schema) {
      this.visitNode(node.schema);
      this.append(".");
    }
    this.visitNode(node.identifier);
  }
  visitCreateTable(node) {
    this.append("create ");
    if (node.frontModifiers && node.frontModifiers.length > 0) {
      this.compileList(node.frontModifiers, " ");
      this.append(" ");
    }
    if (node.temporary) {
      this.append("temporary ");
    }
    this.append("table ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.table);
    if (node.selectQuery) {
      this.append(" as ");
      this.visitNode(node.selectQuery);
    } else {
      this.append(" (");
      this.compileList([...node.columns, ...node.constraints ?? []]);
      this.append(")");
      if (node.onCommit) {
        this.append(" on commit ");
        this.append(node.onCommit);
      }
      if (node.endModifiers && node.endModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.endModifiers, " ");
      }
    }
  }
  visitColumnDefinition(node) {
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.column);
    this.append(" ");
    this.visitNode(node.dataType);
    if (node.unsigned) {
      this.append(" unsigned");
    }
    if (node.frontModifiers && node.frontModifiers.length > 0) {
      this.append(" ");
      this.compileList(node.frontModifiers, " ");
    }
    if (node.generated) {
      this.append(" ");
      this.visitNode(node.generated);
    }
    if (node.identity) {
      this.append(" identity");
    }
    if (node.defaultTo) {
      this.append(" ");
      this.visitNode(node.defaultTo);
    }
    if (node.notNull) {
      this.append(" not null");
    }
    if (node.unique) {
      this.append(" unique");
    }
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    if (node.primaryKey) {
      this.append(" primary key");
    }
    if (node.autoIncrement) {
      this.append(" ");
      this.append(this.getAutoIncrement());
    }
    if (node.references) {
      this.append(" ");
      this.visitNode(node.references);
    }
    if (node.check) {
      this.append(" ");
      this.visitNode(node.check);
    }
    if (node.endModifiers && node.endModifiers.length > 0) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  getAutoIncrement() {
    return "auto_increment";
  }
  visitReferences(node) {
    this.append("references ");
    this.visitNode(node.table);
    this.append(" (");
    this.compileList(node.columns);
    this.append(")");
    if (node.onDelete) {
      this.append(" on delete ");
      this.append(node.onDelete);
    }
    if (node.onUpdate) {
      this.append(" on update ");
      this.append(node.onUpdate);
    }
  }
  visitDropTable(node) {
    this.append("drop table ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.table);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitDataType(node) {
    this.append(node.dataType);
  }
  visitOrderBy(node) {
    this.append("order by ");
    this.compileList(node.items);
  }
  visitOrderByItem(node) {
    this.visitNode(node.orderBy);
    if (node.collation) {
      this.append(" ");
      this.visitNode(node.collation);
    }
    if (node.direction) {
      this.append(" ");
      this.visitNode(node.direction);
    }
    if (node.nulls) {
      this.append(" nulls ");
      this.append(node.nulls);
    }
  }
  visitGroupBy(node) {
    this.append("group by ");
    this.compileList(node.items);
  }
  visitGroupByItem(node) {
    this.visitNode(node.groupBy);
  }
  visitUpdateQuery(node) {
    const rootQueryNode = this.nodeStack.find(QueryNode.is);
    const isSubQuery = rootQueryNode !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("update ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    if (node.table) {
      this.visitNode(node.table);
      this.append(" ");
    }
    this.append("set ");
    if (node.updates) {
      this.compileList(node.updates);
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.from) {
      this.append(" ");
      this.visitNode(node.from);
    }
    if (node.joins) {
      if (!node.from) {
        throw new Error("Joins in an update query are only supported as a part of a PostgreSQL 'update set from join' query. If you want to create a MySQL 'update join set' query, see https://kysely.dev/docs/examples/update/my-sql-joins");
      }
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitColumnUpdate(node) {
    this.visitNode(node.column);
    this.append(" = ");
    this.visitNode(node.value);
  }
  visitLimit(node) {
    this.append("limit ");
    this.visitNode(node.limit);
  }
  visitOffset(node) {
    this.append("offset ");
    this.visitNode(node.offset);
  }
  visitOnConflict(node) {
    this.append("on conflict");
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    } else if (node.constraint) {
      this.append(" on constraint ");
      this.visitNode(node.constraint);
    } else if (node.indexExpression) {
      this.append(" (");
      this.visitNode(node.indexExpression);
      this.append(")");
    }
    if (node.indexWhere) {
      this.append(" ");
      this.visitNode(node.indexWhere);
    }
    if (node.doNothing === true) {
      this.append(" do nothing");
    } else if (node.updates) {
      this.append(" do update set ");
      this.compileList(node.updates);
      if (node.updateWhere) {
        this.append(" ");
        this.visitNode(node.updateWhere);
      }
    }
  }
  visitOnDuplicateKey(node) {
    this.append("on duplicate key update ");
    this.compileList(node.updates);
  }
  visitCreateIndex(node) {
    this.append("create ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
  }
  visitDropIndex(node) {
    this.append("drop index ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitCreateSchema(node) {
    this.append("create schema ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.schema);
  }
  visitDropSchema(node) {
    this.append("drop schema ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.schema);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitPrimaryKeyConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("primary key (");
    this.compileList(node.columns);
    this.append(")");
    this.buildDeferrable(node);
  }
  buildDeferrable(node) {
    if (node.deferrable !== void 0) {
      if (node.deferrable) {
        this.append(" deferrable");
      } else {
        this.append(" not deferrable");
      }
    }
    if (node.initiallyDeferred !== void 0) {
      if (node.initiallyDeferred) {
        this.append(" initially deferred");
      } else {
        this.append(" initially immediate");
      }
    }
  }
  visitUniqueConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("unique");
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    this.append(" (");
    this.compileList(node.columns);
    this.append(")");
    this.buildDeferrable(node);
  }
  visitCheckConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("check (");
    this.visitNode(node.expression);
    this.append(")");
  }
  visitForeignKeyConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("foreign key (");
    this.compileList(node.columns);
    this.append(") ");
    this.visitNode(node.references);
    if (node.onDelete) {
      this.append(" on delete ");
      this.append(node.onDelete);
    }
    if (node.onUpdate) {
      this.append(" on update ");
      this.append(node.onUpdate);
    }
    this.buildDeferrable(node);
  }
  visitList(node) {
    this.compileList(node.items);
  }
  visitWith(node) {
    this.append("with ");
    if (node.recursive) {
      this.append("recursive ");
    }
    this.compileList(node.expressions);
  }
  visitCommonTableExpression(node) {
    this.visitNode(node.name);
    this.append(" as ");
    if (isBoolean(node.materialized)) {
      if (!node.materialized) {
        this.append("not ");
      }
      this.append("materialized ");
    }
    this.visitNode(node.expression);
  }
  visitCommonTableExpressionName(node) {
    this.visitNode(node.table);
    if (node.columns) {
      this.append("(");
      this.compileList(node.columns);
      this.append(")");
    }
  }
  visitAlterTable(node) {
    this.append("alter table ");
    this.visitNode(node.table);
    this.append(" ");
    if (node.renameTo) {
      this.append("rename to ");
      this.visitNode(node.renameTo);
    }
    if (node.setSchema) {
      this.append("set schema ");
      this.visitNode(node.setSchema);
    }
    if (node.addConstraint) {
      this.visitNode(node.addConstraint);
    }
    if (node.dropConstraint) {
      this.visitNode(node.dropConstraint);
    }
    if (node.renameConstraint) {
      this.visitNode(node.renameConstraint);
    }
    if (node.columnAlterations) {
      this.compileColumnAlterations(node.columnAlterations);
    }
    if (node.addIndex) {
      this.visitNode(node.addIndex);
    }
    if (node.dropIndex) {
      this.visitNode(node.dropIndex);
    }
  }
  visitAddColumn(node) {
    this.append("add column ");
    this.visitNode(node.column);
  }
  visitRenameColumn(node) {
    this.append("rename column ");
    this.visitNode(node.column);
    this.append(" to ");
    this.visitNode(node.renameTo);
  }
  visitDropColumn(node) {
    this.append("drop column ");
    this.visitNode(node.column);
  }
  visitAlterColumn(node) {
    this.append("alter column ");
    this.visitNode(node.column);
    this.append(" ");
    if (node.dataType) {
      if (this.announcesNewColumnDataType()) {
        this.append("type ");
      }
      this.visitNode(node.dataType);
      if (node.dataTypeExpression) {
        this.append("using ");
        this.visitNode(node.dataTypeExpression);
      }
    }
    if (node.setDefault) {
      this.append("set default ");
      this.visitNode(node.setDefault);
    }
    if (node.dropDefault) {
      this.append("drop default");
    }
    if (node.setNotNull) {
      this.append("set not null");
    }
    if (node.dropNotNull) {
      this.append("drop not null");
    }
  }
  visitModifyColumn(node) {
    this.append("modify column ");
    this.visitNode(node.column);
  }
  visitAddConstraint(node) {
    this.append("add ");
    this.visitNode(node.constraint);
  }
  visitDropConstraint(node) {
    this.append("drop constraint ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.constraintName);
    if (node.modifier === "cascade") {
      this.append(" cascade");
    } else if (node.modifier === "restrict") {
      this.append(" restrict");
    }
  }
  visitRenameConstraint(node) {
    this.append("rename constraint ");
    this.visitNode(node.oldName);
    this.append(" to ");
    this.visitNode(node.newName);
  }
  visitSetOperation(node) {
    this.append(node.operator);
    this.append(" ");
    if (node.all) {
      this.append("all ");
    }
    this.visitNode(node.expression);
  }
  visitCreateView(node) {
    this.append("create ");
    if (node.orReplace) {
      this.append("or replace ");
    }
    if (node.materialized) {
      this.append("materialized ");
    }
    if (node.temporary) {
      this.append("temporary ");
    }
    this.append("view ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    this.append(" ");
    if (node.columns) {
      this.append("(");
      this.compileList(node.columns);
      this.append(") ");
    }
    if (node.as) {
      this.append("as ");
      this.visitNode(node.as);
    }
  }
  visitRefreshMaterializedView(node) {
    this.append("refresh materialized view ");
    if (node.concurrently) {
      this.append("concurrently ");
    }
    this.visitNode(node.name);
    if (node.withNoData) {
      this.append(" with no data");
    } else {
      this.append(" with data");
    }
  }
  visitDropView(node) {
    this.append("drop ");
    if (node.materialized) {
      this.append("materialized ");
    }
    this.append("view ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitGenerated(node) {
    this.append("generated ");
    if (node.always) {
      this.append("always ");
    }
    if (node.byDefault) {
      this.append("by default ");
    }
    this.append("as ");
    if (node.identity) {
      this.append("identity");
    }
    if (node.expression) {
      this.append("(");
      this.visitNode(node.expression);
      this.append(")");
    }
    if (node.stored) {
      this.append(" stored");
    }
  }
  visitDefaultValue(node) {
    this.append("default ");
    this.visitNode(node.defaultValue);
  }
  visitSelectModifier(node) {
    if (node.rawModifier) {
      this.visitNode(node.rawModifier);
    } else {
      this.append(SELECT_MODIFIER_SQL[node.modifier]);
    }
    if (node.of) {
      this.append(" of ");
      this.compileList(node.of, ", ");
    }
  }
  visitCreateType(node) {
    this.append("create type ");
    this.visitNode(node.name);
    if (node.enum) {
      this.append(" as enum ");
      this.visitNode(node.enum);
    }
  }
  visitDropType(node) {
    this.append("drop type ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
  }
  visitExplain(node) {
    this.append("explain");
    if (node.options || node.format) {
      this.append(" ");
      this.append(this.getLeftExplainOptionsWrapper());
      if (node.options) {
        this.visitNode(node.options);
        if (node.format) {
          this.append(this.getExplainOptionsDelimiter());
        }
      }
      if (node.format) {
        this.append("format");
        this.append(this.getExplainOptionAssignment());
        this.append(node.format);
      }
      this.append(this.getRightExplainOptionsWrapper());
    }
  }
  visitDefaultInsertValue(_) {
    this.append("default");
  }
  visitAggregateFunction(node) {
    this.append(node.func);
    this.append("(");
    if (node.distinct) {
      this.append("distinct ");
    }
    this.compileList(node.aggregated);
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    this.append(")");
    if (node.withinGroup) {
      this.append(" within group (");
      this.visitNode(node.withinGroup);
      this.append(")");
    }
    if (node.filter) {
      this.append(" filter(");
      this.visitNode(node.filter);
      this.append(")");
    }
    if (node.over) {
      this.append(" ");
      this.visitNode(node.over);
    }
  }
  visitOver(node) {
    this.append("over(");
    if (node.partitionBy) {
      this.visitNode(node.partitionBy);
      if (node.orderBy) {
        this.append(" ");
      }
    }
    if (node.orderBy) {
      this.visitNode(node.orderBy);
    }
    this.append(")");
  }
  visitPartitionBy(node) {
    this.append("partition by ");
    this.compileList(node.items);
  }
  visitPartitionByItem(node) {
    this.visitNode(node.partitionBy);
  }
  visitBinaryOperation(node) {
    this.visitNode(node.leftOperand);
    this.append(" ");
    this.visitNode(node.operator);
    this.append(" ");
    this.visitNode(node.rightOperand);
  }
  visitUnaryOperation(node) {
    this.visitNode(node.operator);
    if (!this.isMinusOperator(node.operator)) {
      this.append(" ");
    }
    this.visitNode(node.operand);
  }
  isMinusOperator(node) {
    return OperatorNode.is(node) && node.operator === "-";
  }
  visitUsing(node) {
    this.append("using ");
    this.compileList(node.tables);
  }
  visitFunction(node) {
    this.append(node.func);
    this.append("(");
    this.compileList(node.arguments);
    this.append(")");
  }
  visitCase(node) {
    this.append("case");
    if (node.value) {
      this.append(" ");
      this.visitNode(node.value);
    }
    if (node.when) {
      this.append(" ");
      this.compileList(node.when, " ");
    }
    if (node.else) {
      this.append(" else ");
      this.visitNode(node.else);
    }
    this.append(" end");
    if (node.isStatement) {
      this.append(" case");
    }
  }
  visitWhen(node) {
    this.append("when ");
    this.visitNode(node.condition);
    if (node.result) {
      this.append(" then ");
      this.visitNode(node.result);
    }
  }
  visitJSONReference(node) {
    this.visitNode(node.reference);
    this.visitNode(node.traversal);
  }
  visitJSONPath(node) {
    if (node.inOperator) {
      this.visitNode(node.inOperator);
    }
    this.append("'$");
    for (const pathLeg of node.pathLegs) {
      this.visitNode(pathLeg);
    }
    this.append("'");
  }
  visitJSONPathLeg(node) {
    const isArrayLocation = node.type === "ArrayLocation";
    this.append(isArrayLocation ? "[" : ".");
    this.append(String(node.value));
    if (isArrayLocation) {
      this.append("]");
    }
  }
  visitJSONOperatorChain(node) {
    for (let i = 0, len = node.values.length; i < len; i++) {
      if (i === len - 1) {
        this.visitNode(node.operator);
      } else {
        this.append("->");
      }
      this.visitNode(node.values[i]);
    }
  }
  visitMergeQuery(node) {
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("merge ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    this.append("into ");
    this.visitNode(node.into);
    if (node.using) {
      this.append(" ");
      this.visitNode(node.using);
    }
    if (node.whens) {
      this.append(" ");
      this.compileList(node.whens, " ");
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitMatched(node) {
    if (node.not) {
      this.append("not ");
    }
    this.append("matched");
    if (node.bySource) {
      this.append(" by source");
    }
  }
  visitAddIndex(node) {
    this.append("add ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    this.visitNode(node.name);
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
  }
  visitCast(node) {
    this.append("cast(");
    this.visitNode(node.expression);
    this.append(" as ");
    this.visitNode(node.dataType);
    this.append(")");
  }
  visitFetch(node) {
    this.append("fetch next ");
    this.visitNode(node.rowCount);
    this.append(` rows ${node.modifier}`);
  }
  visitOutput(node) {
    this.append("output ");
    this.compileList(node.selections);
  }
  visitTop(node) {
    this.append(`top(${node.expression})`);
    if (node.modifiers) {
      this.append(` ${node.modifiers}`);
    }
  }
  visitOrAction(node) {
    this.append(node.action);
  }
  visitCollate(node) {
    this.append("collate ");
    this.visitNode(node.collation);
  }
  append(str) {
    this.#sql += str;
  }
  appendValue(parameter) {
    this.addParameter(parameter);
    this.append(this.getCurrentParameterPlaceholder());
  }
  getLeftIdentifierWrapper() {
    return '"';
  }
  getRightIdentifierWrapper() {
    return '"';
  }
  getCurrentParameterPlaceholder() {
    return "$" + this.numParameters;
  }
  getLeftExplainOptionsWrapper() {
    return "(";
  }
  getExplainOptionAssignment() {
    return " ";
  }
  getExplainOptionsDelimiter() {
    return ", ";
  }
  getRightExplainOptionsWrapper() {
    return ")";
  }
  sanitizeIdentifier(identifier) {
    const leftWrap = this.getLeftIdentifierWrapper();
    const rightWrap = this.getRightIdentifierWrapper();
    let sanitized = "";
    for (const c of identifier) {
      sanitized += c;
      if (c === leftWrap) {
        sanitized += leftWrap;
      } else if (c === rightWrap) {
        sanitized += rightWrap;
      }
    }
    return sanitized;
  }
  sanitizeStringLiteral(value) {
    return value.replace(LIT_WRAP_REGEX, "''");
  }
  addParameter(parameter) {
    this.#parameters.push(parameter);
  }
  appendImmediateValue(value) {
    if (isString(value)) {
      this.appendStringLiteral(value);
    } else if (isNumber(value) || isBoolean(value) || isBigInt(value)) {
      this.append(value.toString());
    } else if (isNull(value)) {
      this.append("null");
    } else if (isDate(value)) {
      this.appendImmediateValue(value.toISOString());
    } else {
      throw new Error(`invalid immediate value ${value}`);
    }
  }
  appendStringLiteral(value) {
    this.append("'");
    this.append(this.sanitizeStringLiteral(value));
    this.append("'");
  }
  sortSelectModifiers(arr) {
    arr.sort((left, right) => left.modifier && right.modifier ? SELECT_MODIFIER_PRIORITY[left.modifier] - SELECT_MODIFIER_PRIORITY[right.modifier] : 1);
    return freeze(arr);
  }
  compileColumnAlterations(columnAlterations) {
    this.compileList(columnAlterations);
  }
  /**
   * controls whether the dialect adds a "type" keyword before a column's new data
   * type in an ALTER TABLE statement.
   */
  announcesNewColumnDataType() {
    return true;
  }
};
var SELECT_MODIFIER_SQL = freeze({
  ForKeyShare: "for key share",
  ForNoKeyUpdate: "for no key update",
  ForUpdate: "for update",
  ForShare: "for share",
  NoWait: "nowait",
  SkipLocked: "skip locked",
  Distinct: "distinct"
});
var SELECT_MODIFIER_PRIORITY = freeze({
  ForKeyShare: 1,
  ForNoKeyUpdate: 1,
  ForUpdate: 1,
  ForShare: 1,
  NoWait: 2,
  SkipLocked: 2,
  Distinct: 0
});
var JOIN_TYPE_SQL = freeze({
  InnerJoin: "inner join",
  LeftJoin: "left join",
  RightJoin: "right join",
  FullJoin: "full join",
  CrossJoin: "cross join",
  LateralInnerJoin: "inner join lateral",
  LateralLeftJoin: "left join lateral",
  LateralCrossJoin: "cross join lateral",
  OuterApply: "outer apply",
  CrossApply: "cross apply",
  Using: "using"
});

// node_modules/kysely/dist/esm/query-compiler/compiled-query.js
var CompiledQuery = freeze({
  raw(sql2, parameters = []) {
    return freeze({
      sql: sql2,
      query: RawNode.createWithSql(sql2),
      parameters: freeze(parameters),
      queryId: createQueryId()
    });
  }
});

// node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js
var DialectAdapterBase = class {
  get supportsCreateIfNotExists() {
    return true;
  }
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return false;
  }
  get supportsOutput() {
    return false;
  }
};

// node_modules/kysely/dist/esm/parser/savepoint-parser.js
function parseSavepointCommand(command, savepointName) {
  return RawNode.createWithChildren([
    RawNode.createWithSql(`${command} `),
    IdentifierNode.create(savepointName)
    // ensures savepointName gets sanitized
  ]);
}

// node_modules/kysely/dist/esm/migration/migrator.js
var DEFAULT_MIGRATION_TABLE = "kysely_migration";
var DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
var NO_MIGRATIONS = freeze({ __noMigrations__: true });

// node_modules/kysely/dist/esm/dialect/postgres/postgres-query-compiler.js
var ID_WRAP_REGEX = /"/g;
var PostgresQueryCompiler = class extends DefaultQueryCompiler {
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX, '""');
  }
};

// node_modules/kysely/dist/esm/dialect/postgres/postgres-introspector.js
var PostgresIntrospector = class {
  #db;
  constructor(db2) {
    this.#db = db2;
  }
  async getSchemas() {
    let rawSchemas = await this.#db.selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute();
    return rawSchemas.map((it) => ({ name: it.nspname }));
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select([
      "a.attname as column",
      "a.attnotnull as not_null",
      "a.atthasdef as has_default",
      "c.relname as table",
      "c.relkind as table_type",
      "ns.nspname as schema",
      "typ.typname as type",
      "dtns.nspname as type_schema",
      sql`col_description(a.attrelid, a.attnum)`.as("column_description"),
      sql`pg_get_serial_sequence(quote_ident(ns.nspname) || '.' || quote_ident(c.relname), a.attname)`.as("auto_incrementing")
    ]).where("c.relkind", "in", [
      "r",
      "v",
      "p"
    ]).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("ns.nspname", "!=", "crdb_internal").where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("c.relname", "!=", DEFAULT_MIGRATION_TABLE).where("c.relname", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const rawColumns = await query.execute();
    return this.#parseTableMetadata(rawColumns);
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
  #parseTableMetadata(columns) {
    return columns.reduce((tables, it) => {
      let table = tables.find((tbl) => tbl.name === it.table && tbl.schema === it.schema);
      if (!table) {
        table = freeze({
          name: it.table,
          isView: it.table_type === "v",
          schema: it.schema,
          columns: []
        });
        tables.push(table);
      }
      table.columns.push(freeze({
        name: it.column,
        dataType: it.type,
        dataTypeSchema: it.type_schema,
        isNullable: !it.not_null,
        isAutoIncrementing: it.auto_incrementing !== null,
        hasDefaultValue: it.has_default,
        comment: it.column_description ?? void 0
      }));
      return tables;
    }, []);
  }
};

// node_modules/kysely/dist/esm/dialect/postgres/postgres-adapter.js
var LOCK_ID = BigInt("3853314791062309107");
var PostgresAdapter = class extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return true;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(db2, _opt) {
    await sql`select pg_advisory_xact_lock(${sql.lit(LOCK_ID)})`.execute(db2);
  }
  async releaseMigrationLock(_db, _opt) {
  }
};

// node_modules/kysely/dist/esm/util/stack-trace-utils.js
function extendStackTrace(err, stackError) {
  if (isStackHolder(err) && stackError.stack) {
    const stackExtension = stackError.stack.split("\n").slice(1).join("\n");
    err.stack += `
${stackExtension}`;
    return err;
  }
  return err;
}
function isStackHolder(obj) {
  return isObject(obj) && isString(obj.stack);
}

// node_modules/kysely/dist/esm/dialect/postgres/postgres-driver.js
var PRIVATE_RELEASE_METHOD = Symbol();
var PostgresDriver = class {
  #config;
  #connections = /* @__PURE__ */ new WeakMap();
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init() {
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
  }
  async acquireConnection() {
    const client = await this.#pool.connect();
    let connection = this.#connections.get(client);
    if (!connection) {
      connection = new PostgresConnection(client, {
        cursor: this.#config.cursor ?? null
      });
      this.#connections.set(client, connection);
      if (this.#config.onCreateConnection) {
        await this.#config.onCreateConnection(connection);
      }
    }
    if (this.#config.onReserveConnection) {
      await this.#config.onReserveConnection(connection);
    }
    return connection;
  }
  async beginTransaction(connection, settings) {
    if (settings.isolationLevel || settings.accessMode) {
      let sql2 = "start transaction";
      if (settings.isolationLevel) {
        sql2 += ` isolation level ${settings.isolationLevel}`;
      }
      if (settings.accessMode) {
        sql2 += ` ${settings.accessMode}`;
      }
      await connection.executeQuery(CompiledQuery.raw(sql2));
    } else {
      await connection.executeQuery(CompiledQuery.raw("begin"));
    }
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async savepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
  }
  async rollbackToSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
  }
  async releaseSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
  }
  async releaseConnection(connection) {
    connection[PRIVATE_RELEASE_METHOD]();
  }
  async destroy() {
    if (this.#pool) {
      const pool = this.#pool;
      this.#pool = void 0;
      await pool.end();
    }
  }
};
var PostgresConnection = class {
  #client;
  #options;
  constructor(client, options) {
    this.#client = client;
    this.#options = options;
  }
  async executeQuery(compiledQuery) {
    try {
      const { command, rowCount, rows } = await this.#client.query(compiledQuery.sql, [...compiledQuery.parameters]);
      return {
        numAffectedRows: command === "INSERT" || command === "UPDATE" || command === "DELETE" || command === "MERGE" ? BigInt(rowCount) : void 0,
        rows: rows ?? []
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    }
  }
  async *streamQuery(compiledQuery, chunkSize) {
    if (!this.#options.cursor) {
      throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
    }
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
      throw new Error("chunkSize must be a positive integer");
    }
    const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
    try {
      while (true) {
        const rows = await cursor.read(chunkSize);
        if (rows.length === 0) {
          break;
        }
        yield {
          rows
        };
      }
    } finally {
      await cursor.close();
    }
  }
  [PRIVATE_RELEASE_METHOD]() {
    this.#client.release();
  }
};

// node_modules/kysely/dist/esm/dialect/postgres/postgres-dialect.js
var PostgresDialect = class {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new PostgresDriver(this.#config);
  }
  createQueryCompiler() {
    return new PostgresQueryCompiler();
  }
  createAdapter() {
    return new PostgresAdapter();
  }
  createIntrospector(db2) {
    return new PostgresIntrospector(db2);
  }
};

// src/database/index.ts
import { Pool } from "pg";
var dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DB_CONNECTION
  })
});
var db = new Kysely({ dialect });

// src/util.ts
var apyToApr = (apy) => Math.log(1 + apy);
var average = (array) => array.length > 0 ? array.reduce((total, value) => total + value) / array.length : 0;
var isDefined = (value) => value !== null && value !== void 0;

// src/yields/defi-llama.ts
var defiLlamaPools = {
  // staked eth
  wsteth: "747c1d2a-c668-4682-b9f9-296708a3dd90",
  reth: "d4b3c522-6127-4b89-bedf-83641cdcd2eb",
  cbeth: "0f45d730-b279-4629-8e11-ccb5cc3038b4",
  meth: "b9f2f00a-ba96-4589-a171-dde979a23d87",
  // restaked / other eth
  weeth: "46bd2bdf-6d92-4066-b482-e885ee172264",
  rseth: "33c732f6-a78d-41da-af5b-ccd9fa5e52d5",
  wrseth: "33c732f6-a78d-41da-af5b-ccd9fa5e52d5",
  ezeth: "e28e32b5-e356-41d9-8dc7-a376ece56619",
  sweth: "ca2acc2d-6246-44aa-ae91-8725b2c62c7c",
  unieth: "ad383eed-61d8-4378-80bd-a197d9a11c79",
  woeth: "423681e3-4787-40ce-ae43-e9f67c5269b3",
  wsuperoethb: "f388573e-5c0f-4dac-9f70-116a4aabaf17",
  oseth: "4d01599c-69ae-41a3-bae1-5fab896f04c8",
  yneth: "44dd4153-aa9f-4616-9a88-e6803c86b995",
  ynethx: "e3c59895-d6ad-4634-b257-f599f1a1a4a0",
  rsweth: "eff9b43c-a80d-4bfc-9f9e-55e02a8ef619",
  ethx: "90bfb3c2-5d35-4959-a275-ba5085b08aa3",
  bsdeth: "ca775845-b68a-4084-8d8d-29c31970a643",
  "eth+": "4e6cd326-72d5-4680-8d2f-3481d50e8bb1",
  eth0: "d6747cb4-9635-49f9-b417-cbfb9faa252e",
  teth: "5762f4a8-bb48-45d6-90ed-2d93d1777169",
  yoeth: "2070ceaf-eedb-4795-9ede-6841ec515e1a",
  yeth: "5018322c-f433-4870-83b9-754991b8e3e2",
  // btc
  ybtc: "3eb3663d-7cf7-4a24-9f26-24de17c616aa",
  // stables
  susds: "d8c4eff5-c8a9-46fc-a888-057c4c668e72",
  susde: "66985a81-9c51-46ca-9977-42b4fe7bc6df",
  stusr: "0aedb3f6-9298-49de-8bb0-2f611a4df784",
  wstusr: "0aedb3f6-9298-49de-8bb0-2f611a4df784",
  rlp: "2ad8497d-c855-4840-85ad-cdc536b92ced",
  "usd0++": "55b0893b-1dbb-47fd-9912-5e439cd3d511",
  srusd: "402b0554-9525-40af-8703-3c59b0aa863c",
  stusdt: "e1b9420a-30d4-4c27-8e01-2d6cd240e1b9",
  hyusd: "8449ce9a-fc8d-4d93-991a-55113fa80a5a",
  yusd: "7c43e890-cefc-48d1-bf80-203cdb7dfe4f"
};
var scrape = async () => {
  const results = await Promise.all(Object.entries(defiLlamaPools).map(async ([symbol, pool]) => {
    const yields = await getPoolYields(pool);
    if (!yields) return null;
    return {
      asset: {
        addresses: [],
        symbol: symbol.toLowerCase()
      },
      yields
    };
  }));
  return results.filter(isDefined);
};
async function getPoolYields(pool) {
  const response = await fetch(`https://yields.llama.fi/chart/${pool}`).catch((error) => {
    console.warn(`Unable to fetch defi llama pool ${pool}`, error);
    return null;
  });
  if (!response) return null;
  const { data } = await response.json();
  const now = /* @__PURE__ */ new Date();
  const nowMinus1Day = /* @__PURE__ */ new Date();
  nowMinus1Day.setDate(now.getDate() - 1);
  const dailyData = data.filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus1Day.getTime()).map(({ apy }) => apy);
  const nowMinus7Days = /* @__PURE__ */ new Date();
  nowMinus7Days.setDate(now.getDate() - 7);
  const weeklyData = data.filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus7Days.getTime()).map(({ apy }) => apy);
  const nowMinus30Days = /* @__PURE__ */ new Date();
  nowMinus30Days.setDate(now.getDate() - 30);
  const monthlyData = data.filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus30Days.getTime()).map(({ apy }) => apy);
  const nowMinus365Days = /* @__PURE__ */ new Date();
  nowMinus365Days.setDate(now.getDate() - 365);
  const yearlyData = data.filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus365Days.getTime()).map(({ apy }) => apy);
  return {
    daily: apyToApr(average(dailyData) / 100),
    weekly: apyToApr(average(weeklyData) / 100),
    monthly: apyToApr(average(monthlyData) / 100),
    yearly: apyToApr(average(yearlyData) / 100)
  };
}

// node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain
  };
}

// node_modules/viem/_esm/errors/version.js
var version = "2.37.12";

// node_modules/viem/_esm/errors/base.js
var errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version}`
};
var BaseError = class _BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = (() => {
      if (args.cause instanceof _BaseError)
        return args.cause.details;
      if (args.cause?.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof _BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = args.name ?? this.name;
    this.shortMessage = shortMessage;
    this.version = version;
  }
  walk(fn) {
    return walk(this, fn);
  }
};
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}

// node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError = class extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
};
var SizeOverflowError = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
};

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}

// node_modules/viem/_esm/utils/data/trim.js
function trim4(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}

// node_modules/viem/_esm/errors/data.js
var SliceOffsetOutOfBoundsError = class extends BaseError {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size2}).`, { name: "SliceOffsetOutOfBoundsError" });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
};

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}

// node_modules/viem/_esm/utils/encoding/toHex.js
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
var encoder = /* @__PURE__ */ new TextEncoder();
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}

// node_modules/viem/_esm/utils/encoding/toBytes.js
var encoder2 = /* @__PURE__ */ new TextEncoder();
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}

// node_modules/viem/_esm/utils/formatters/formatter.js
function defineFormatter(type, format) {
  return ({ exclude, format: overrides }) => {
    return {
      exclude,
      format: (args, action) => {
        const formatted = format(args, action);
        if (exclude) {
          for (const key of exclude) {
            delete formatted[key];
          }
        }
        return {
          ...formatted,
          ...overrides(args, action)
        };
      },
      type
    };
  };
}

// node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction, _) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block, _) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt, _) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);

// node_modules/viem/_esm/constants/number.js
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint256 = 2n ** 256n - 1n;

// node_modules/viem/_esm/utils/data/concat.js
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}

// node_modules/viem/_esm/errors/cursor.js
var NegativeOffsetError = class extends BaseError {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`, {
      name: "NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError = class extends BaseError {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
  }
};

// node_modules/viem/_esm/utils/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}

// node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode } of list) {
        encode(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
}

// node_modules/viem/_esm/constants/unit.js
var gweiUnits = {
  ether: -9,
  wei: 9
};

// node_modules/viem/_esm/utils/unit/formatUnits.js
function formatUnits(value, decimals) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}

// node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei(wei, unit = "wei") {
  return formatUnits(wei, gweiUnits[unit]);
}

// node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
var InvalidLegacyVError = class extends BaseError {
  constructor({ v }) {
    super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
      name: "InvalidLegacyVError"
    });
  }
};
var InvalidSerializableTransactionError = class extends BaseError {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ],
      name: "InvalidSerializableTransactionError"
    });
  }
};
var InvalidStorageKeySizeError = class extends BaseError {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
  }
};

// node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js
function serializeAuthorizationList(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const { chainId, nonce, ...signature } = authorization;
    const contractAddress = authorization.address;
    serializedAuthorizationList.push([
      chainId ? toHex(chainId) : "0x",
      contractAddress,
      nonce ? toHex(nonce) : "0x",
      ...toYParitySignatureArray({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}

// node_modules/viem/_esm/utils/blob/blobsToCommitments.js
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}

// node_modules/viem/_esm/utils/blob/blobsToProofs.js
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u) => u : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

// node_modules/@noble/hashes/esm/sha256.js
var sha2562 = sha256;

// node_modules/viem/_esm/utils/hash/sha256.js
function sha2563(value, to_) {
  const to = to_ || "hex";
  const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  const { commitment, version: version2 = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2563(commitment, "bytes");
  versionedHash.set([version2], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version: version2 } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version2
    }));
  }
  return hashes;
}

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg = 1;

// node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError = class extends BaseError {
  constructor({ maxSize, size: size2 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size2} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
};
var EmptyBlobError = class extends BaseError {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
};
var InvalidVersionedHashSizeError = class extends BaseError {
  constructor({ hash, size: size2 }) {
    super(`Versioned hash "${hash}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size2}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
};
var InvalidVersionedHashVersionError = class extends BaseError {
  constructor({ hash, version: version2 }) {
    super(`Versioned hash "${hash}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg}`,
        `Received: ${version2}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
};

// node_modules/viem/_esm/utils/blob/toBlobs.js
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size2 = 0;
    while (size2 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size2++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}

// node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  const { data, kzg, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}

// node_modules/viem/_esm/errors/address.js
var InvalidAddressError = class extends BaseError {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
};

// node_modules/viem/_esm/errors/chain.js
var InvalidChainIdError = class extends BaseError {
  constructor({ chainId }) {
    super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
  }
};

// node_modules/viem/_esm/errors/node.js
var ExecutionRevertedError = class extends BaseError {
  constructor({ cause, message } = {}) {
    const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause,
      name: "ExecutionRevertedError"
    });
  }
};
Object.defineProperty(ExecutionRevertedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 3
});
Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /execution reverted/
});
var FeeCapTooHighError = class extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause,
      name: "FeeCapTooHighError"
    });
  }
};
Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
var FeeCapTooLowError = class extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause,
      name: "FeeCapTooLowError"
    });
  }
};
Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
var NonceTooHighError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
  }
};
Object.defineProperty(NonceTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too high/
});
var NonceTooLowError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause, name: "NonceTooLowError" });
  }
};
Object.defineProperty(NonceTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too low|transaction already imported|already known/
});
var NonceMaxValueError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
  }
};
Object.defineProperty(NonceMaxValueError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce has max value/
});
var InsufficientFundsError = class extends BaseError {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ],
      name: "InsufficientFundsError"
    });
  }
};
Object.defineProperty(InsufficientFundsError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /insufficient funds|exceeds transaction sender account balance/
});
var IntrinsicGasTooHighError = class extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause,
      name: "IntrinsicGasTooHighError"
    });
  }
};
Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too high|gas limit reached/
});
var IntrinsicGasTooLowError = class extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause,
      name: "IntrinsicGasTooLowError"
    });
  }
};
Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too low/
});
var TransactionTypeNotSupportedError = class extends BaseError {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause,
      name: "TransactionTypeNotSupportedError"
    });
  }
};
Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /transaction type not valid/
});
var TipAboveFeeCapError = class extends BaseError {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause,
      name: "TipAboveFeeCapError"
    });
  }
};
Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});

// node_modules/viem/_esm/utils/lru.js
var LruMap = class extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/@noble/hashes/esm/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// node_modules/viem/_esm/utils/address/getAddress.js
var checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}

// node_modules/viem/_esm/utils/address/isAddress.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
var isAddressCache = /* @__PURE__ */ new LruMap(8192);
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}

// node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}

// node_modules/viem/_esm/utils/transaction/assertTransaction.js
function assertTransactionEIP7702(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { chainId } = authorization;
      const address = authorization.address;
      if (!isAddress(address))
        throw new InvalidAddressError({ address });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError();
    for (const hash of blobVersionedHashes) {
      const size_ = size(hash);
      const version2 = hexToNumber(slice(hash, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash, size: size_ });
      if (version2 !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash,
          version: version2
        });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}

// node_modules/viem/_esm/utils/transaction/serializeAccessList.js
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0; i < accessList.length; i++) {
    const { address, storageKeys } = accessList[i];
    for (let j = 0; j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}

// node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction(transaction, signature) {
  const type = getTransactionType(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP7702(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
  return concatHex([
    "0x04",
    toRlp([
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP4844(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex(x));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? numberToHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP1559(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
  assertTransactionEIP2930(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
  assertTransactionLegacy(transaction);
  let serializedTransaction = [
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v2 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    const r = trim4(signature.r);
    const s = trim4(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(v),
      r === "0x00" ? "0x" : r,
      s === "0x00" ? "0x" : s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
  const signature = signature_ ?? transaction;
  const { v, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const r = trim4(signature.r);
  const s = trim4(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? numberToHex(1) : "0x";
    if (v === 0n)
      return "0x";
    if (v === 1n)
      return numberToHex(1);
    return v === 27n ? "0x" : numberToHex(1);
  })();
  return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
}

// node_modules/viem/_esm/op-stack/contracts.js
var contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};

// node_modules/viem/_esm/op-stack/formatters.js
var formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x7e") {
        transaction.isSystemTx = args.isSystemTx;
        transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
        transaction.sourceHash = args.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
        l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
        l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
        l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
      };
    }
  })
};

// node_modules/viem/_esm/op-stack/serializers.js
function serializeTransaction2(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers = {
  transaction: serializeTransaction2
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from,
    to ?? "0x",
    mint ? toHex(mint) : "0x",
    value ? toHex(value) : "0x",
    gas ? toHex(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data ?? "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from, to } = transaction;
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
}

// node_modules/viem/_esm/op-stack/chainConfig.js
var chainConfig = {
  blockTime: 2e3,
  contracts,
  formatters,
  serializers
};

// node_modules/viem/_esm/chains/definitions/arbitrum.js
var arbitrum = /* @__PURE__ */ defineChain({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 250,
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});

// node_modules/viem/_esm/chains/definitions/base.js
var sourceId = 1;
var base = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId
});
var basePreconf = /* @__PURE__ */ defineChain({
  ...base,
  experimental_preconfirmationTime: 200,
  rpcUrls: {
    default: {
      http: ["https://mainnet-preconf.base.org"]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mainnet.js
var mainnet = /* @__PURE__ */ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 12e3,
  rpcUrls: {
    default: {
      http: ["https://eth.merkle.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 23085558
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mantle.js
var mantle = /* @__PURE__ */ defineChain({
  id: 5e3,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://mantlescan.xyz/",
      apiUrl: "https://api.mantlescan.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 304717
    }
  }
});

// node_modules/viem/_esm/chains/definitions/optimism.js
var sourceId2 = 1;
var optimism = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId2]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [sourceId2]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [sourceId2]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [sourceId2]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: sourceId2
});

// src/yields/pendle.ts
var validChainIds = [arbitrum.id, base.id, mainnet.id, mantle.id, optimism.id];
async function getPendleYield(chainId, tokenAddress) {
  tokenAddress = tokenAddress.toLowerCase();
  if (!validChainIds.includes(chainId)) return null;
  const markets = await getPendleMarkets(chainId);
  const data = markets?.find(
    ({ address, pt }) => address.toLowerCase() === tokenAddress || pt.toLowerCase() === `${chainId}-${tokenAddress}`
  );
  if (data) {
    if (data.address.toLowerCase() === tokenAddress) {
      return apyToApr(data.details.aggregatedApy);
    } else {
      return apyToApr(data.details.impliedApy);
    }
  }
  return null;
}
var marketsCache = /* @__PURE__ */ new Map();
async function getPendleMarkets(chainId) {
  let data = marketsCache.get(chainId);
  if (data !== void 0) return data?.markets;
  const response = await fetch(`https://api-v2.pendle.finance/core/v1/${chainId}/markets/active`).catch(() => null);
  data = response ? await response.json() : null;
  marketsCache.set(chainId, data ?? null);
  return data?.markets;
}

// netlify/functions/yields.ts
var yields_default = async (req, context) => {
  console.log(`Running 'yields' function...`);
  const borrowAddresses = db.selectFrom("loops").select(["chain_id", "borrow_asset_address as address", "borrow_asset_symbol as symbol"]);
  const supplyAddresses = db.selectFrom("loops").select(["chain_id", "supply_asset_address as address", "supply_asset_symbol as symbol"]);
  const results = await borrowAddresses.union(supplyAddresses).execute();
  const existingSymbols = new Set(results.map((result) => result.symbol.toLowerCase()).filter((symbol) => !!symbol));
  console.log(`Found ${existingSymbols.size} distinct symbols in the existing loops table`);
  const yields = await Promise.all([
    scrape(),
    ...results.map(async ({ chain_id, address, symbol }) => {
      const pendleYield = await getPendleYield(chain_id, address);
      if (!pendleYield) return [];
      return [{
        asset: {
          addresses: [`${chain_id}-${address.toLowerCase()}`],
          symbol
        },
        yields: {
          daily: pendleYield,
          weekly: null,
          monthly: null,
          yearly: null
        }
      }];
    }),
    {
      // hardcode LBTC yield for now
      asset: {
        addresses: [],
        symbol: "lbtc"
      },
      yields: {
        daily: apyToApr(0.82),
        weekly: apyToApr(0.82),
        monthly: apyToApr(0.82),
        yearly: apyToApr(0.82)
      }
    }
  ]);
  const symbols = /* @__PURE__ */ new Set();
  const values = yields.flat().filter((data) => {
    if (!symbols.has(data.asset.symbol)) {
      symbols.add(data.asset.symbol);
      return true;
    }
    return false;
  }).map((data) => ({
    asset_symbol: data.asset.symbol,
    yield_apr_daily: data.yields.daily,
    yield_apr_weekly: data.yields.weekly,
    yield_apr_monthly: data.yields.monthly,
    yield_apr_yearly: data.yields.yearly
  }));
  console.log(`Found ${values.length} yields, updating db...`);
  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("yields").execute();
    return await trx.insertInto("yields").values(values).execute();
  });
  console.log(`Updated db with ${values.length} yield entries`);
  return new Response("Success!");
};
export {
  yields_default as default
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
