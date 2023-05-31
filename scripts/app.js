const { UIKit, Kernel, FileStorage, Setting } = require("./lib/easy-jsbox")

class AppKernel extends Kernel {
    constructor(init = true) {
        super()
        this.query = $context.query
        // FileStorage
        this.fileStorage = new FileStorage()
        // Setting
        this.setting = new Setting({ fileStorage: this.fileStorage })
        this.setting.loadConfig()
        if (init) {
            this.setting.useJsboxNav()
        }
    }
}

class AppUI {
    static renderMainUI() {
        const kernel = new AppKernel()
        kernel.useJsboxNav()
        const MainUI = require("./ui/main")
        const mainUI = new MainUI(kernel)
        kernel.setNavButtons(mainUI.getNavButtons())
        kernel.UIRender(mainUI.getView())
    }

    static renderUnsupported() {
        $intents.finish("不支持在此环境中运行")
        $ui.render({
            views: [
                {
                    type: "label",
                    props: {
                        text: "不支持在此环境中运行",
                        align: $align.center
                    },
                    layout: $layout.fill
                }
            ]
        })
    }
}

module.exports = {
    run: () => {
        if ($app.env === $env.app) {
            AppUI.renderMainUI()
        } else {
            AppUI.renderUnsupported()
        }
    }
}
