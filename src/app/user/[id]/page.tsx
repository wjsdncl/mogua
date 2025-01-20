export const dynamic = "force-dynamic";

import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";

async function getUserInfo(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch user profile: ${res.status}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export default async function UserPage({ params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const userInfo = await getUserInfo(userId);

    return (
      // 가시성을 위해 임시 배경 bg-black으로 설정함 (전체 레이아웃에 배경 넣기 전)
      <div className='flex h-full flex-1 flex-col bg-black p-4 tablet:px-20 tablet:py-[52px] desktop:py-[56px]'>
        <div className='mx-auto flex w-full flex-col desktop:max-w-[960px]'>
          {/* 유저 프로필 섹션 */}
          <section aria-label='프로필 정보'>
            <UserProfile userInfo={userInfo} />
          </section>
          {/* 유저 컨텐츠 섹션 */}
          <section aria-label='활동 내역'>
            <UserTabs
              isInstructor={userInfo.qualificationStatus === "QUALIFIED"}
              ownId={userInfo.ownId}
            />
          </section>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error in UserPage:", error);
    return (
      <div className='flex h-full flex-1 items-center justify-center'>
        <p className='text-gray-100'>
          {error?.message || "프로필을 불러오는데 실패했습니다."}
        </p>
      </div>
    );
  }
}
