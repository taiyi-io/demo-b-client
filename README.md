# A Demo for the application system of Bank B

## 演示场景说明 Scenario

B银行记录客户资产状况，根据验资请求对客户的资产能力出具验证结果。参与双方无需相互提供贷款金额或者资产情况等关键业务数据，即可完成审批，有效促进组织间协作。

Bank B manages the customer's assets and issues the capital verification report when requested.Participants could complete the verification without providing each other with critical data such as the loan amount or customer assets.

## 开发调试 Development

运行测试前，先将平台分配的私钥数据保存在"access_key.json"中，然后配置"package.json"的参数chain.host和chain.port设定好到网关的连接信息。

Before running the test, save the private key data allocated by the platform in "access_key.json", and then configure the parameters chain.host and chain.port of "package.json" to the service address of the gateway.

### Debug

```bash
$yarn dev
```



### Build & Run

```bash
$yarn build
$yarn start
```