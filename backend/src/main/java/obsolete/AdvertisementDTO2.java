package obsolete;

import com.company.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;
import obsolete.CategoryDTO2;

@Getter
@Setter
public class AdvertisementDTO2 {
    private long id;

    private String name;

    private String description;

    private UserDTO user;

    private CategoryDTO2 category;
}
