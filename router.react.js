/*Created by Administrator on 2015/7/2.*/
'use strict';

define([
    'underscore',
    'backbone',
    'react',
    'Ajax',
    'Confirm',
    'jsx!component/IndexComponent.react',
    'jsx!component/PeiZiAndCapital/PeiziRecordListComponent.react',
    'jsx!component/PeiZiAndCapital/CapitalRecordListComponent.react',
    'jsx!component/Search/SearchComponent.react',
    'jsx!component/Search/HeaderSearchComponent.react',
    'jsx!component/User/UserDetailComponent.react',
    'jsx!component/Remark/OperatorComponent.react',
    'jsx!component/FrameWork/XXCaifuHeader.react',
    'jsx!component/FrameWork/Header.react',
    'jsx!component/FrameWork/Left.react',
    'jsx!component/FrameWork/Footer.react',
    'jsx!component/FrameWork/ToLoginHeader.react',
    'jsx!component/FrameWork/WeiXinLogin.react',
    'jsx!component/FrameWork/FindUserPwd.react',
    'jsx!component/FrameWork/Register.react',
    'jsx!component/FrameWork/RegisterSuccess.react',
    'jsx!component/FrameWork/WeiXinFooter.react',
    'jsx!component/FrameWork/WeiXinHeader.react',
    'jsx!component/Common/Cookie.react',
    'jsx!component/InvestProduct/InvestIndex.react',
    'jsx!component/InvestProduct/ProductDetail.react',
    'jsx!component/InvestProduct/ProductBuy.react',
    'jsx!component/InvestProduct/ProductPayResult.react',
    'jsx!component/PersonalCenter/AssetData.react',
    'jsx!component/PersonalCenter/TransactionIndex.react',
    'jsx!component/PersonalCenter/PersonalDataModification.react',
    'jsx!component/PersonalCenter/BanksMange.react',
    'jsx!component/PersonalCenter/ADetailCharge.react',
    'jsx!component/PersonalCenter/AccountSecurity.react',
    'jsx!component/PersonalCenter/AccountSecurityEdit.react',
    'jsx!component/HomePage/Home.react',
    'jsx!component/HomePage/QueEventMore.react',
    'jsx!component/HomePage/EventDetail.react',
    'jsx!component/HomePage/HelpDetail.react',
    'jsx!component/OtherPage/FinancialPage.react',
    'jsx!component/OtherPage/CashPage.react',
    'jsx!component/OtherPage/AboutXX.react',
    'jsx!component/OtherPage/UserProtocol.react',
    'jsx!component/OtherPage/ProductProtocol.react',
    'jsx!component/Admin/Admin.react',
    'jsx!component/Admin/AdminHeader.react',
    'jsx!component/Admin/AdminFooter.react',
    'jsx!component/Admin/RichTextBox.react',
    'jsx!component/Common/LocalStorageComponent.react',
    'jsx!component/Common/ReturnLoginComponent.react',
    'jsx!component/Common/ErrorPage.react',
    'model/UserModel',
    'model/PeiziModel',
    'model/PeiziRecordListModel',
    'model/CapitalRecordListModel',
    'model/RemarkModel',
    'model/OperatorModel',
    'model/CookieModel',
    'model/UserWebModel',
    'model/OrderModel',
    'model/AssetModel',
    'collection/PeiziRecordCollection',
    'collection/CapitalRecordCollection',
],function(_, Backbone, React,Ajax,Confirm,IndexComponent,PeiziRecordListComponent,CapitalRecordListComponent,SearchComponent,HeaderSearchComponent,UserDetailComponent,OperatorComponent,XXCaifuHeader,Header,Left,Footer,ToLoginHeader,WeiXinLogin,FindUserPwd,Register,
           RegisterSuccess,WeiXinFooter,WeiXinHeader,Cookie,Invest,ProductDetail,ProductBuy,ProductPayResult,AssetData,TransactionIndex,PersonalData,BanksMange,ADetailCharge,AccountSecurity,AccountSecurityEdit,Home,QueEventMore,EventDetail,HelpDetail,FinancialPage,CashPage,AboutXX,UserProtocol,ProductProtocol,
           Admin,AdminHeader,AdminFooter,RichTextBox,LocalStorageComponent,ReturnLoginComponent,ErrorPage,UserModel,PeiziModel,PeiziRecordListModel,CapitalRecordListModel,RemarkModel,OperatorModel,CookieModel,UserWebModel,OrderModel,AssetModel,PeiZiRC,CapitalRC){
    var AppRouter = Backbone.Router.extend({
        showRichTextBox:function(id){
            window.changeMeta("翔翔财富-富文本内容");
            var contentsNode = document.getElementById('contents');
            var userWebModel = this.newUserWebModel("showRichTextBox");

            React.render(
                 <div>
                     <WeiXinHeader user={userWebModel}/>
                     <div className="container" style={{minHeight:"501px"}}>
                         <div className="richBoxPge">
                                <RichTextBox id={id}/>
                         </div>
                      </div>
                     <WeiXinFooter headType={"personal"}/>
                 </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        Admin:function(title,type,page){
            window.changeMeta("翔翔财富-管理员");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("Admin");
            title = title ? title : "product"
            type = type?type:"all";
            page = page?page:"1";

            React.render(
                <div>
                    <AdminHeader title={title} user={userWebModel}/>
                    <Admin title={title} type={type} page={page} user={userWebModel}/>
                    <AdminFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },

        ErrorPage:function(error){
            window.changeMeta("翔翔财富-账户安全");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("ErrorPage");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <ErrorPage error = {error}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        accountSecurityEdit:function(pass){
            window.changeMeta("翔翔财富-账户安全");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("accountSecurityEdit");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <AccountSecurityEdit user={userWebModel} title="账户安全" pass = {pass}/>
                    <WeiXinFooter headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        accountSecurity:function(){
            window.changeMeta("翔翔财富-账户安全");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("accountSecurity");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <AccountSecurity user={userWebModel} title="账户安全"/>
                    <WeiXinFooter headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        ProductProtocol:function(id,protocol){
            if(protocol=="note"){
                window.changeMeta("翔翔财富-产品须知");
            }else {
                window.changeMeta("翔翔财富-产品协议");
            }
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("ProductProtocol");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <ProductProtocol id={id} title={protocol}/>
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        UserProtocol:function(){
            window.changeMeta("翔翔财富-会员注册协议");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("UserProtocol");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <UserProtocol />
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        cash:function(){
            window.changeMeta("翔翔财富-变现");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("cash");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType="cash"/>
                    <CashPage />
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        aboutXX:function(){
          window.changeMeta("翔翔财富-关于翔翔");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("aboutXX");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType="aboutXX"/>
                    <AboutXX />
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        financial:function(){
            window.changeMeta("翔翔财富-融资");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("financial");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType="financial"/>
                    <FinancialPage />
                    <WeiXinFooter headType="financial"/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        eventDetail:function(id){
            window.changeMeta("翔翔财富-活动详情");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("eventDetail");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <EventDetail id={id}/>
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        article:function(tType,bType,page){//上级目录，下级目录，分页
            window.changeMeta("翔翔财富");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("article");
            tType=((tType==undefined)?"":tType),
            bType=((bType==undefined)?"":bType);
            var t = "",headType="";
            if(tType=="event"){
                page=((page==undefined)?1:page);
                t = <QueEventMore tType={tType} bType={bType}  page={page}/>
            }else{
                page=((page==undefined)?"":page);
                if(tType==""){
                    tType="about",bType="platform"
                }
                t = <HelpDetail tType={tType} bType={bType} id={page}/>;
                headType="helpCenter";
            }

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType={headType}/>
                    {t}
                    <WeiXinFooter/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        personalData:function(){
            window.changeMeta("翔翔财富-个人中心");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalData"),title="资料修改";

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <PersonalData title={title} user={userWebModel}/>
                    <WeiXinFooter  headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        personalTransRecord:function(palState,page){
            var title="交易记录";
            window.changeMeta("翔翔财富-交易记录");
            palState=(palState==undefined||palState==null||palState=="")?"all":palState;
            page=(page==undefined||page==null||page=="")?1:page;
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalTransRecord");
            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <TransactionIndex title={title} user={userWebModel} palState={palState} page={page}/>
                    <WeiXinFooter  headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        personalAsset:function(){
            window.changeMeta("翔翔财富-我的资产");
            var assetModel = this.newAssetModel();
            var title = "我的资产";
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalAsset");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <AssetData assetData={assetModel} title={title} user={userWebModel}/>
                    <WeiXinFooter  headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");

        },
        personalBanksMange:function(){
            window.changeMeta("翔翔财富-银行卡管理");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalBanksMange"),title="银行卡管理";

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <BanksMange title={title} user={userWebModel}/>
                    <WeiXinFooter  headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        personalAssetDetails:function(type,status,page){
            var title="余额明细";
            window.changeMeta("翔翔财富-余额明细");
            status=(status==undefined||status==null||status=="")?"all":status;
            type=(type==undefined||type==null||type=="")?"all":type;
            page=(page==undefined||page==null||page=="")?1:page;
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalAssetDetails");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <ADetailCharge title={title} user={userWebModel} status={status} type={type} page={page}/>
                    <WeiXinFooter  headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        personalCharge:function(){
            var title="余额明细";
            window.changeMeta("翔翔财富-充值");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("personalCharge");

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <ADetailCharge user={userWebModel} title={title}/>
                    <WeiXinFooter headType={"personal"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        payResult:function(orderId,result,cardId){
            window.changeMeta("翔翔财富-支付");
            var contentsNode = document.getElementById('contents');
            var userWebModel= this.newUserWebModel("payResult");
            var orderModel = this.newOrderModel();
            orderModel.url="/api/orders/"+orderId;
            orderModel.fetch({
                async:false,
                success:function(status,data){
                    orderModel = data.items[0];
                },
                error:function(status,data){
                    if(data.status=="401"){
                        var returnLogin = new ReturnLoginComponent();
                        returnLogin.returnLogin();
                    }
                }
            });

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType={"invest"}/>
                    <ProductPayResult payResult={result} order ={orderModel} cardId={cardId}/>
                    <WeiXinFooter  headType={"invest"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        investBuy:function(id){//购买的品种
            window.changeMeta("翔翔财富-支付");
            var contentsNode = document.getElementById('contents');
            var userWebModel = this.newUserWebModel("investBuy");

            var orderModel = this.newOrderModel();
            orderModel.url="/api/orders/"+id;
            orderModel.fetch({
                async:false,
                success:function(status,data){
                    orderModel = data.items[0];
                },
                error:function(status,data){
                    if(data.status=="401"){
                        var returnLogin = new ReturnLoginComponent();
                        returnLogin.returnLogin();
                    }
                }
            });

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType={"invest"}/>
                    <ProductBuy order ={orderModel} user={userWebModel} />
                    <WeiXinFooter headType={"invest"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        invest:function(type,page,sort){
            window.changeMeta("翔翔财富-产品");
            var cookieModel = new CookieModel();
            var cookie = new Cookie();
            cookieModel.set("loginStatus",cookie.getCookie("loginStatus"));

            var contentsNode = document.getElementById('contents');
            var userWebModel= this.newUserWebModel("invest");

            React.render(
                <div>
                    <WeiXinHeader cookieModel ={cookieModel}  user={userWebModel} headType={"invest"}/>
                    <Invest type={type} page={page} cookieModel = {cookieModel} sort={sort}/>
                    <WeiXinFooter headType={"invest"}/>
                </div>
                ,
                document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        investDetail:function(id){
            window.changeMeta("翔翔财富-产品详情");
            var contentsNode = document.getElementById('contents');
            var userWebModel= this.newUserWebModel("investDetail");
            var orderModel = this.newOrderModel();

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel} headType={"invest"}/>
                    <ProductDetail id={id} user={userWebModel} orderModel={orderModel}/>
                    <WeiXinFooter headType={"invest"}/>
                </div>

                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        home:function(){
            window.changeMeta("翔翔财富-首页");
            var contentsNode = document.getElementById('contents');
            var userWebModel=this.newUserWebModel("home");
            var assetModel = this.newAssetModel();

            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}  headType={"homePage"}/>
                    <Home user={userWebModel} assetData={assetModel}/>
                    <WeiXinFooter headType={"homePage"}/>
                </div>
                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        login:function(){
            window.changeMeta("翔翔财富-登录");
            var userWebModel=this.newUserWebModel("login");
            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <WeiXinLogin/>
                    <WeiXinFooter/>
                </div>
                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        findPwd:function(){
            window.changeMeta("翔翔财富-找回密码");
            var userWebModel=this.newUserWebModel("findPwd");
            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <FindUserPwd/>
                    <WeiXinFooter/>
                </div>
                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        register:function(){
            window.changeMeta("翔翔财富-注册");
            var userWebModel=this.newUserWebModel("register");
            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <Register/>
                    <WeiXinFooter/>
                </div>
                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        registerSuccess:function(){
            window.changeMeta("翔翔财富-注册成功");
            var userWebModel=this.newUserWebModel("registerSuccess");
            React.render(
                <div>
                    <WeiXinHeader user={userWebModel}/>
                    <RegisterSuccess />
                    <WeiXinFooter/>
                </div>
                ,document.getElementById('contents')
            );
            $("#wrapper").css("display","none");
        },
        peizi: function(uid,type,status){
            window.changeMeta("翔翔财富-配资");
            uid = (uid == undefined || uid == null||uid==0)?"":uid;
            type = (type == undefined || type == null || type==0)?"":type;
            status =(status == undefined || status ==null)?"in_progress":status;
            status=(status==0)?"":status;

            var peiziRecordListModel = new PeiziRecordListModel();
            var PeiZiRCs = new PeiZiRC();
            PeiZiRCs.url=this.getAPI('PEIZI');

            var remarkModel = new RemarkModel();
            var operatorModel = new OperatorModel();

            var cookie=new Cookie();
            operatorModel.set("cookie", cookie.getCookie("operatorName"));

            var peiziModel = new PeiziModel(uid,type,status,"peizi");
            peiziModel.set('type',type);

            var opt = {
                includeUser:true,
                uid:uid,
                type:type,
                status:status
            };

            var userModel = new UserModel(opt.uid,"","");

            var wrapperNode = document.getElementById('wrapper');
            try{
                React.unmountComponentAtNode(wrapperNode);

            }catch(e){console.log("Error unmount", e);}


            React.render(
                <div>
                    <Header/>
                    <Left/>
                    <div id="page-wrapper">
                        <div id="page-inner">
                            <OperatorComponent operatorModel={operatorModel}/>
                            <HeaderSearchComponent peiziModel={peiziModel}/>
                            <UserDetailComponent user={userModel}  remarkModel = {remarkModel}  operatorModel={operatorModel}/>
                            <PeiziRecordListComponent model={peiziRecordListModel} peiziModel={peiziModel}/>
                        </div>
                    </div>
                    <Footer />
                </div>
                ,
                document.getElementById('wrapper')
            );

            PeiZiRCs.fetch({
                data:opt,
                success:function(status,data) {
                    var  newUlist=data.info.users;
                    var  newPlist = data.items;
                    var  list={};
                    list.ulist=newUlist;
                    list.plist=newPlist;
                    try {
                        peiziRecordListModel.set('list', list);
                    }catch(e){
                        console.log("mmm", e);
                    }
                }
            });

            if(uid !=''){
                $.ajax({
                    url:this.getAPI("USER")+"/"+uid,
                    type:"POST",
                    dataType:"JSON",
                    success:function(data,status){
                        if(status == 'success') {
                            userModel.set("name",data.items[0].name);
                            userModel.set("mobile",data.items[0].mobile);
                            userModel.set("id",data.items[0].id);
                        }
                    },
                    error:function(){
                        $.alert({
                            title: '',
                            content:"获取数据失败！"
                        });
                    }
                });
                $.ajax({
                    type:"get",
                    url :this.getAPI("USER")+"/"+uid+this.API_MAPPING["REMARK"],
                    dataType:"JSON",
                    success:function(data){
                        remarkModel.set("remarks",data.items);
                        remarkModel.set("status","fetch");
                    },
                    error:function(){
                        $.alert({
                            title: '',
                            content:"获取数据失败！"
                        });
                    }
                });
            }

            this.getRemarkModel(uid,remarkModel,peiziModel);
            this.getOperatorModel(operatorModel);
        },
        getOperatorModel:function(operatorModel){
            operatorModel.on("change",function(){
                operatorModel.set("cookie", document.cookie);
            }.bind(this));
        },
        getRemarkModel : function(uid,remarkModel,peiziModel){
            remarkModel.on("change",function(){
                uid = peiziModel.get("uid")?peiziModel.get("uid"):uid;
                if(uid!='')
                {
                    $.ajax({
                        url:this.getAPI("USER")+"/"+uid+this.API_MAPPING['REMARK'],
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type:"GET",
                        dataType:"json",
                        success:function(data){
                            remarkModel.set("remarks",data.items);
                            remarkModel.set("status","fetch");
                        },
                        error:function(data){
                            console.log(data);
                        }
                    });
                }
            }.bind(this));
        },

        capital:function(uid,type,status){
            window.changeMeta("翔翔财富-资金流水");
            uid = (uid == undefined || uid == null||uid==0)?"":uid;
            type = (type == undefined || type == null || type==0)?"":type;
            status =(status == undefined || status ==null||status==0)?"":status;

            var remarkModel = new RemarkModel();
            var operatorModel = new OperatorModel();

            var cookie=new Cookie();
            operatorModel.set("cookie", cookie.getCookie("operatorName"));

            var capitalRecordListModel = new CapitalRecordListModel();
            var CapitalRCs= new CapitalRC();
            CapitalRCs.url=this.getAPI('CAPITAL');

            var opt = {
                includeUser:true,
                uid:uid,
                type:type,
                status:status
            };

            var peiziModel = new PeiziModel(uid,type,status,"capital");
            peiziModel.set('type',type);

            var userModel = new UserModel(uid,"","");

            var wrapperNode = document.getElementById('wrapper');
            try{
                React.unmountComponentAtNode(wrapperNode);

            }catch(e){console.log("Error unmount", e);}

            React.render(
                <div>
                    <Header/>
                    <Left/>
                    <div id="page-wrapper">
                        <div id="page-inner">
                            <OperatorComponent operatorModel={operatorModel}/>
                            <HeaderSearchComponent peiziModel={peiziModel}/>
                            <UserDetailComponent user={userModel}  remarkModel = {remarkModel}  operatorModel={operatorModel}/>
                            <CapitalRecordListComponent model={capitalRecordListModel} peiziModel={peiziModel}/>
                        </div>
                    </div>
                    <Footer />
                </div>
                ,
                document.getElementById('wrapper')
            )

            CapitalRCs.fetch({
                data:opt,
                success:function(status,data) {
                    var newUlist=data.info.users;
                    var newClist = data.items;
                    var  list={};
                    list.ulist=newUlist;
                    list.clist=newClist;
                    capitalRecordListModel.set('list', list);
                }
            });

            if(uid !=''){
                $.ajax({
                    url:this.getAPI("USER")+"/"+uid,
                    type:"POST",
                    dataType:"JSON",
                    success:function(data,status){
                        if(status == 'success') {
                            userModel.set("name",data.items[0].name);
                            userModel.set("mobile",data.items[0].mobile);
                            userModel.set("id",data.items[0].id);
                        }
                    },
                    error:function(){
                        $.alert({
                            title: '',
                            content:"获取数据失败！"
                        });
                    }
                });
                $.ajax({
                    type:"get",
                    url :this.getAPI("USER")+"/"+uid+this.API_MAPPING["REMARK"],
                    dataType:"JSON",
                    success:function(data){
                        remarkModel.set("remarks",data.items);
                        remarkModel.set("status","fetch");
                    },
                    error:function(){
                        $.alert({
                            title: '',
                            content:"获取数据失败！"
                        });
                    }
                });
            }

            this.getRemarkModel(uid,remarkModel,peiziModel);
            this.getOperatorModel(operatorModel);
        },
        newOrderModel:function(){
            this.orderModel.on("change",function(){

            }.bind(this));
            return this.orderModel;
        },
        newUserWebModel:function(url){
            this.setXXConfig();
            this.backModalHandle();
            window.allHref.push({
                url:url
            });
            this.userWebModel.on("change",function(){
                this.userWebModel.set("user",this.userWebModel.get("user"));
            }.bind(this));
            return this.userWebModel;
        },
        newAssetModel:function(){
            this.assetModel.on("change",function(){
                this.assetModel.set("earnMoney",this.assetModel.get("earnMoney"));
                this.assetModel.set("totalMoney",this.assetModel.get("totalMoney"));
                this.assetModel.set("availableMoney",this.assetModel.get("availableMoney"));
                this.assetModel.set("inprogressMoney",this.assetModel.get("inprogressMoney"));
                this.assetModel.set("proportion",this.assetModel.get("proportion"));
            }.bind(this));
            return this.assetModel;
        },
        setXXConfig:function(){//设置allowOnlinePay
            var aQuery = window.location.href.split("?");//取得Get参数
            if(aQuery.length > 1)
            {
                var aBuf = aQuery[1].split("&");
                for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                {
                    var aTmp = aBuf[i].split("=");//分离key与Value
                    if(aTmp[0]=="allowOnlinePay"){
                        window.XXCaifu.allowOnlinePay = (aTmp[1]!=null && (aTmp[1].toLowerCase()=="true"));
                        break;
                    }
                }
            }
        },
        backModalHandle: function () {//处理强制回退后的modal框
            var x = $("div[class='modal-backdrop fade in']");
            if (x.length > 0) {
                x = x[0];
                document.body.removeChild(x);
                $("body").removeClass("modal-open");
            }
        },
        initialize: function() {
            var self = this,
            routes = [
                [/^.*$/, 'ErrorPage'],
                [/^$/, 'home'],
                    ['peizi/:uid/:type/:status','peizi'],
                    ['capital/:uid/:type/:status','capital'],
                    ['invest','invest'],
                    ['invest/:type/:page','invest'],
                    ['invest/:type/:page/:sort','invest'],
                    ['invest/product/:id','investDetail'],
                    ['investBuy/:id','investBuy'],
                    ['payResult/:id/:result/:cardId','payResult'],
                    ['login','login'],
                    ['home','home'],
                    ['article','article'],
                    ['article/:tType/:bType','article'],
                    ['article/:tType/:bType/:page','article'],
                    ['article/event/detail/:id','eventDetail'],
                    ['findPwd','findPwd'],
                    ['register','register'],
                    ['registerSuccess','registerSuccess'],
                    ['personal/asset','personalAsset'],
                    ['personal/personalData','personalData'],
                    ['personal/transRecord','personalTransRecord'],
                    ['personal/transRecord/:palState/:page','personalTransRecord'],
                    ['personal/banksMange','personalBanksMange'],
                    ['personal/assetDetails','personalAssetDetails'],
                    ['personal/assetDetails/:type/:status/:page','personalAssetDetails'],
                    ['personal/charge','personalCharge'],
                    ['personal/accountSecurity','accountSecurity'],
                    ['personal/accountSecurityEdit/:pass','accountSecurityEdit'],
                    ['financial','financial'],
                    ['aboutXXCaifu','aboutXX'],
                    ['cash','cash'],
                    ['protocol/user','UserProtocol'],
                    ['invest/product/:id/:protocol','ProductProtocol'],
                    ['error/:error','ErrorPage'],
                    ['admin','Admin'],
                    ['admin/:title','Admin'],
                    ['admin/:title/:params','Admin'],
                    ['admin/:title/:type/:page','Admin'],
                    ['richTextBox/:id','showRichTextBox']
                ];
            window.allHref =[];
            _.each(routes, function(route) {
                self.route.apply(self, route);
            });
            Backbone.history.start();

        },
        _base: globamParam.url_header+"/api",
        API_MAPPING: {
            PEIZI: "/peizi",
            CAPITAL:"/capital",
            USER:"/user",
            REMARK:"/remark"
        },
        orderModel : new OrderModel(),
        userWebModel: new UserWebModel(),
        assetModel: new  AssetModel(),
        getAPI:function(name){
            return this._base + this.API_MAPPING[name];
        },
    });
    return AppRouter;
});
