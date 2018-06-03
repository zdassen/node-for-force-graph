/**
 *
 * base-node.js
 *
 */


/* 基本ノードクラス */
class BaseNode {


  /* コンストラクタ */
  constructor() {

    // 接続先のノード
    this.targets = [];

    // 接続済みのノード ID
    this.targetIds = [];  
    
    // ノード ID ( 0 から開始 )
    let nodeId = BaseNode.createdNodes.length;
    this.id = nodeId;

    // 自身を追加する
    BaseNode.createdNodes.push(this);

    // ノードタイプ
    // グラフのノードの色を切り分けるのに使用する
    this.type = "base";

  }


  /* ノードからノードへ接続する */
  to(...nodes) {
    
    // 型チェック
    let checkType = (node) => {
      if (!(node instanceof BaseNode)) {
        let emsg = 
          "argument node must be an instance of \"BaseNode\"";
        throw emsg;
      }
    };

    // ダブりチェック
    let checkIsDup = (node) => {
      if (this.targetIds.includes(node.id)) {
        let emsg = "duplicated node passed";
        throw emsg;
      }
    };

    // ノードを接続する
    nodes.forEach((node) => {
      checkType(node);
      checkIsDup(node);
      this.targets.push(node);
      this.targetIds.push(node.id);
    });

    // チェーンで書けるようにする ( Node.to().to().to(). ... )
    // 最後に追加したノードが返るようにする
    return this.targets.slice(-1)[0];
  }


  /* 全ての Node インスタンスからリンク (接続情報) を作成する */
  static toLinks() {
    
    let nodes = BaseNode.createdNodes;
    let link;
    let links = [];
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      for (let j = 0; j < node.targets.length; j++) {
        link = {
          source: node.id,    // 接続元ノードの ID
          target: node.targets[j].id,    // 接続先ノードの ID
          // ※sourceType, targetTypeがまだ
        };
        links.push(link);
      }
    }

    return links;
  }


  /* ソースにもターゲットにもなっていないノードを取得する */
  static getOrphans() {

    // ターゲットになっているノードの ID
    let targetIds = new Set();
    BaseNode.createdNodes.forEach((node) => {
      node.targetIds.forEach((tid) => {
        targetIds.add(tid);
      });
    });
    targetIds = Array.from(targetIds);

    // ターゲットになっていない & ターゲットを持たない = 孤児
    let orphans = [];
    BaseNode.createdNodes.forEach((node) => {
      if (!targetIds.includes(node.id)) {
        if (node.targets.length === 0) {
          orphans.push(node);
        }
      }
    });

    return orphans;
  }


  /* 生成済みのすべてのノード */
  static get createdNodes() {
    return BaseNode._createdNodes;
  }


}    // end of class BaseNode


/* 生成済みのすべてのノード */
BaseNode._createdNodes = [];