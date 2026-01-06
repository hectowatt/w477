import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || "";

export default function About() {
    return (
        <div>
            <div className="flex items-center justify-center gap-6 mb-4 mt-10">
                <img src={`${basePath}/w477_icon.png`} alt="w477 Icon"></img>
                <div className="flex flex-col">
                    <h2 className="mb-2">名前:w477</h2>
                    <h2 className="mb-2">職業:システムエンジニア</h2>
                    <h2 className="mb-2">居住地:関東</h2>
                </div>
            </div>
            <div className="mt-10">
                <p>名前は「わっと」と読んでください。</p>
                <p>セルフホストに興味があります。自分の使うソフトウェアを自分のサーバで動かすのってとてもロマンがありますよね。</p>
                <p>あと鳥全般が好きです。最近はハシビロコウが好きです。アイコンはドット絵エディター「Pixel Studio」で作成しました。</p>
            </div>
        </div>
    );
}