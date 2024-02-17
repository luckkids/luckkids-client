export const DataDummyGarden = {
      statusCode: 200,
      httpStatus: "OK",
      message: "OK",
      data: {
        myProfile: {
          myId: 1,
          nickname: "럭키즈",
          luckPhrase: "행운문구",
          imageFileUrl: 'assets/images/garden/charactor-lucky.png',
          characterCount: 1,
        },
        friendList: {
          content: [
            {
              friendId: 2,
              nickname: "럭키즈 친구 2",
              luckPhrase: "행운 문구 2",
              imageFileUrl: 'assets/images/garden/charactor-lucky.png',
              characterCount: 1,
            },
            {
              friendId: 3,
              nickname: "럭키즈 친구 3",
              luckPhrase: "행운 문구 3",
              imageFileUrl: 'assets/images/garden/charactor-lucky.png',
              characterCount: 2,
            },
          ],
          pageInfo: {
            currentPage: 1,
            totalPage: 1,
            totalElement: 10,
          },
        },
      },
    }
;
