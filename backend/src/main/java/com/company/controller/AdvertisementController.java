package com.company.controller;

import com.company.dto.AdvertisementDTO;
import com.company.dto.UserDTO;
import com.company.service.AdvertisementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/adv", "/"})
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping("/advertisements")
    public List<AdvertisementDTO> all() {
        return advertisementService.read();
    }

    @GetMapping("/advertisements/{id}")
    public AdvertisementDTO findById(@PathVariable("id") Long id) {
        return advertisementService.getById(id);
    }

//    @CrossOrigin
    @PostMapping("/advertisements")
    public ResponseEntity<AdvertisementDTO> add(@RequestBody AdvertisementDTO advertisementDTO) {
        return ResponseEntity.ok().body(advertisementService.create(advertisementDTO));
    }

    @CrossOrigin
    @PutMapping("/advertisements/{id}")
    public AdvertisementDTO update(@PathVariable("id") Long id, @RequestBody AdvertisementDTO advertisementDTO) {
        advertisementDTO.setId(id);
        return advertisementService.update(advertisementDTO);
    }

    @CrossOrigin
    @DeleteMapping("/advertisements/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        advertisementService.deleteById(id);
        return ResponseEntity.ok().body("Category was deleted successfully");
    }
}
