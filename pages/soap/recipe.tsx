import SoapLayout from "components/soap/layout";
import Head from "next/head";

const Recipe = () => {
  return (
    <>
      <Head>
        <title>Recipe::HeeSoap</title>
      </Head>
      <pre>{`
        #1. **비누레시피별 관리
        #2. 소유한 재료 관리
        #3. 구매가능한 재료 관리
        #4. 작업가능 레시피 관리 
        #5. 레시피별 필요 재료 관리
      `}</pre>
    </>
  );
};
export default Recipe;
Recipe.Layout = SoapLayout;
