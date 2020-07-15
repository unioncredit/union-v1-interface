import ProfileHover from "profile-hover";

const Profile = ({ address, children }) => {
  return (
    <div className="profileHoverReset">
      <ProfileHover orientation="bottom" address={address} noTheme={true}>
        {children}
      </ProfileHover>

      <style jsx global>{`
        .profileHoverReset .paper {
          display: block !important;
        }

        .profileHoverReset *,
        .profileHoverReset ::before,
        .profileHoverReset ::after {
          box-sizing: content-box;
        }

        .profileHoverReset
          .threeboxProfileHover__style_boxAddressWrap
          .threeboxProfileHover__style_hoverWrap.threeboxProfileHover__style_bottom {
          padding-top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
        }

        .profileHoverReset
          .threeboxProfileHover__style_hoverWrap.threeboxProfileHover__style_bottom
          .threeboxProfileHover__style_hoverProfile:after {
          left: 50%;
          margin-left: -5px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
